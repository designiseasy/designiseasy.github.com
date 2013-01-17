module Jekyll

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

      process_pages
      process_posts
    end

    def process_posts
      @site.posts.each do |post|
        temp_post = Post.new(@site, @site.source, '', post.name)
        generate_pjax_file(temp_post, temp_post.name)
      end
    end

    def process_pages
      @site.pages.each do |page|
        temp_page = Page.new(@site, @site.source, File.dirname(page.name), page.name)
        generate_pjax_file(temp_page, temp_page.name)
      end
    end

    def generate_pjax_file(obj, name)
      obj.render(@site.layouts, @site.site_payload)
      @site.static_files << Jekyll::PjaxFile.new(@site, @site.dest, File.dirname(name), name, obj)
    end
  end

end
