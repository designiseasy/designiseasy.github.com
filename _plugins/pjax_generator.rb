module Jekyll

  class PjaxPage < Page
    def initialize(site, base, dir, page)
      @site = site
      @base = base
      @dir = dir
      @name = page.name 

 
      self.process(@name)
      self.read_yaml(File.join(base, File.dirname(page.name)), page.name)
      self.data['layout'] = 'pjax'

    end
  end

  class PjaxPost < Post
    def initialize(site, source, dir, post)
      @site = site
      @base = File.join(source, '_posts')
      @name = post.name

      self.categories = post.categories
      self.process(@name)
      begin 
        self.read_yaml(@base,@name)
      rescue Exception => msg
        raise FatalException.new("#{msg} in #{@base}/#{@name}")
      end

      # If we've added a date and time to the YAML, use that instead of the
      # filename date. Means we'll sort correctly.
      if self.data.has_key?('date')
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

    def destination(dest)
      # The url needs to be unescaped in order to preserve the correct filename
      path = File.join(dest, 'pjax', CGI.unescape(self.url))
      path = File.join(path, "index.html") if template[/\.html$/].nil?
      path
    end
  end


  class PjaxGenerator < Generator
    safe true
    
    def generate(site)
      if site.layouts.key? 'pjax'
        newpages = []
        dir = site.config['pjax_dir'] || 'pjax'
        site.pages.each do |page|
          newpage = PjaxPage.new(site, site.source, dir, page)
          newpage.render(site.layouts, site.site_payload)
          newpages << newpage
        end
        site.pages.concat(newpages)
      
        newposts = []
        site.posts.each do |post|
          newpost = PjaxPost.new(site, site.source, dir, post)
          newpost.render(site.layouts, site.site_payload)
          newposts << newpost
        end
        site.posts.concat(newposts)
      
      end


    end

    def write_page_or_post(site, base, dir, page)
      
    end
  end

end
