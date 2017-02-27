import { DataService } from "../../app/services/data.service";
import { Blog } from "../../app/models/Blog";

describe("dataService test", () => {
    let dataServcie: DataService;
    beforeEach(() => {
        dataServcie = new DataService();
    });
    it("getBlogs", () => {
        let blogs: Blog[] = dataServcie.getBlogs();

        expect(blogs).toBeDefined();
        expect(blogs.length).toBe(2);
    });
    it("getBlogById", () => {
        let blog: Promise<Blog> = dataServcie.getBlogById(1, 1);

        expect(blog).toBeDefined();
        blog.then((b) => {
            expect(b.id).toBe(1);
        });
    });
});