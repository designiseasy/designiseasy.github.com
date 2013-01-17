module Jekyll

  #class PjaxPage < Page
    #def initialize(site, base, dir, page)
      #@site = site
      #@base = base
      #@dir = dir
      #@name = page.name 

 
      #self.process(@name)
      #self.read_yaml(File.join(base, File.dirname(page.name)), page.name)
      #self.data['layout'] = 'pjax'

    #end
  #end

  #class PjaxPost < Post
    #def initialize(site, source, dir, post)
      #@site = site
      #@base = File.join(source, '_posts')
      #@name = post.name

      #self.categories = post.categories
      #self.process(@name)
      #begin 
        #self.read_yaml(@base,@name)
      #rescue Exception => msg
        #raise FatalException.new("#{msg} in #{@base}/#{@name}")
      #end

      ## If we've added a date and time to the YAML, use that instead of the
      ## filename date. Means we'll sort correctly.
      #if self.data.has_key?('date')
        ## ensure Time via to_s and reparse
        #self.date = Time.parse(self.data["date"].to_s)
      #end

      #if self.data.has_key?('published') && self.data['published'] == false
        #self.published = false
      #else
        #self.published = true
      #end

      #self.tags = self.data.pluralized_array("tag", "tags")

      #if self.categories.empty?
        #self.categories = self.data.pluralized_array('category', 'categories')
      #end
      #self.data['layout'] = 'pjax'

    #end

    #def destination(dest)
      ## The url needs to be unescaped in order to preserve the correct filename
      #path = File.join(dest, 'pjax', CGI.unescape(self.url))
      #path = File.join(path, "index.html") if template[/\.html$/].nil?
      #path
    #end
  #end

  class PjaxPage < Page
    def read_yaml(base, name)
      super(base, name)
      self.data['layout'] = 'pjax'
      self.data
    end
  end

  class PjaxPost < Post
    def initialize(site, source, dir, name)
      @site = site
      @base = File.join(source, dir, '_posts')
      @name = name

      self.categories = dir.split('/').reject { |x| x.empty? }
      self.process(name)
      begin 
        self.read_yaml(@base,name)
      rescue Exception => msg
        raise FatalException.new("#{msg} in #{@base}/#{name}")
      end

      # If we've added a date and time to the YAML, use that instead of the
      # filename date. Means we'll sort correctly.
      if self.data.has_key?('date')
        print self.data["date"]
        # ensure Time via to_s and reparse
        self.date = Time.parse(self.data["date"].to_s)
      end

      if self.data.has_key?('published') && self.data['published'] == false
        self.published = false
      else
        self.published = true
      end

      self.tags = self.data.pluralized_array("tag", "tags")

      if self.categories.empty?
        self.categories = self.data.pluralized_array('category', 'categories')
      end
      self.data['layout'] = 'pjax'
    end

    def read_yaml(base, name)
      super(base, name)
      self.data['layout'] = 'pjax'
      self.data
    end
  end

  class PjaxFile < StaticFile
    require 'set'

    def initialize(site, base, dir, name, obj)
      super(site, base, dir, name)
      @output = obj

    end

    def template
      case @site.permalink_style
      when :pretty
        "/:categories/:year/:month/:day/:title/"
      when :none
        "/:categories/:title.html"
      when :date
        "/:categories/:year/:month/:day/:title.html"
      else
        @site.permalink_style.to_s
      end
    end

    def destination(dest)
      if @output.respond_to?('dir')
        path = File.join(dest, 'pjax', CGI.unescape(@output.url))
        path = File.join(path, "index.html") if template[/\.html$/].nil?
      else
        path = File.join(dest, 'pjax', @dir, @name)
      end
      path
    end

    def write(dest)
      path = destination(dest)
      FileUtils.mkdir_p(File.dirname(path))
      File.open(path, 'w') do |f|
        f.write(@output)
      end
    end

  end

  class PjaxGenerator < Generator
    safe true
    
    def generate(site)
      @site = site
      if site.layouts.key? 'pjax'
        process_pages
        process_posts
      end
    end

    def process_posts
      @site.posts.each do |post|
        temp_post = PjaxPost.new(@site, @site.source, '', post.name)
        generate_pjax_file(temp_post, temp_post.name)
      end
    end

    def process_pages
      @site.pages.each do |page|
        temp_page = PjaxPage.new(@site, @site.source, File.dirname(page.name), page.name)
        generate_pjax_file(temp_page, temp_page.name)
      end
    end

    def generate_pjax_file(obj, name)
      layouts = {}
      layouts['pjax'] = Jekyll::Layout.new(@site, File.join(@site.source, '_layouts'), 'pjax.html')
      obj.render(layouts, @site.site_payload)
      @site.static_files << Jekyll::PjaxFile.new(@site, @site.dest, File.dirname(name), name, obj)
    end
  end



end
