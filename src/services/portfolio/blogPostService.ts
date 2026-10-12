import PortfolioHttpService from "./PortfolioHttpService";
import type { BlogPost } from "@/types/portfolio.type";

/** Routes #4–#5 (public) et #21–#26 (admin) */

export const BlogPostApiPath = {
    PublicList: "/blog-posts",
    PublicItem: "/blog-posts", // + /{slug}
    AdminList: "/admin/blog-posts",
    AdminItem: "/admin/blog-posts", // + /{id}
} as const;

class BlogPostService extends PortfolioHttpService {
    /* ---------------------- Public ---------------------- */

    /** Route #4 — ?tag=<tag> */
    getBlogPosts(query?: { tag?: string }): Promise<BlogPost[]> {
        return this.portfolioRequest<BlogPost[]>({
            url: BlogPostApiPath.PublicList,
            query: { tag: query?.tag },
        });
    }

    /** Route #5 */
    getBlogPostBySlug(slug: string): Promise<BlogPost> {
        return this.portfolioRequest<BlogPost>({
            url: `${BlogPostApiPath.PublicItem}/${encodeURIComponent(slug)}`,
        });
    }

    /* ----------------------- Admin ----------------------- */

    /** Route #16 équivalent articles */
    getAdminBlogPosts(): Promise<BlogPost[]> {
        return this.portfolioRequest<BlogPost[]>({
            url: BlogPostApiPath.AdminList,
        });
    }

    /** Route — 201 */
    createBlogPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
        return this.portfolioRequest<BlogPost>({
            url: BlogPostApiPath.AdminList,
            method: "POST",
            body: post,
        });
    }

    updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
        return this.portfolioRequest<BlogPost>({
            url: `${BlogPostApiPath.AdminItem}/${id}`,
            method: "PUT",
            body: post,
        });
    }

    destroyBlogPost(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${BlogPostApiPath.AdminItem}/${id}`,
            method: "DELETE",
        });
    }

    invalidate() {
        void this.queryClient.invalidateQueries({ queryKey: ["/blog-posts"] });
        void this.queryClient.invalidateQueries({ queryKey: ["/admin/blog-posts"] });
    }
}

export const BlogPostServiceInstance = new BlogPostService();
export default BlogPostService;
