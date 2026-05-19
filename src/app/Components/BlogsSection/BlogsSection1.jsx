import Link from "next/link";
import SectionHeading from "../SectionHeading";
import { FaAngleRight } from "react-icons/fa";
import Image from "next/image";

const BlogsSection1 = ({ data }) => {
  return (
    <>
      <div className="container">
        <SectionHeading
          SectionSubtitle={data.sectionSubtitle}
          SectionTitle={data.sectionTitle}
          variant={"text-center"}
        />
        <div className="cs_height_50 cs_height_lg_50" />
        <div className="cs_posts_grid cs_style_1" style={{ alignItems: 'stretch' }}>
          {data.blogsData.map((blog) => (
            <article key={blog.id} className="cs_post cs_style_1" style={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                href={blog.link}
                className="cs_post_thumbnail position-relative"
                style={{ display: 'block', height: 277, overflow: 'hidden', flexShrink: 0 }}
              >
                <Image src={blog.image} alt="img" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 392px" />
                <div className="cs_post_category position-absolute">
                  {blog.category}
                </div>
              </Link>
              <div className="cs_post_content position-relative" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="cs_post_meta_wrapper">
                  <div className="cs_posted_by cs_center position-absolute" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#887d85', color: '#fff', borderRadius: 4, padding: '6px 12px', lineHeight: 1.2,
                  }}>
                    {blog.month
                      ? <><span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase' }}>{blog.month}</span><span style={{ fontSize: 20, fontWeight: 700 }}>{String(blog.day).padStart(2, '0')}</span></>
                      : blog.date}
                  </div>
                  <div className="cs_post_meta_item">
                  <Image src="/assets/img/icons/post_user_icon.png" alt="img" width={15} height={14}   />
                    <span>By: {blog.author}</span>
                  </div>
                  <div className="cs_post_meta_item">
                    <Image src="/assets/img/icons/post_comment_icon.png" alt="img" width={14} height={13}   />
                    <span>{blog.comments}</span>
                  </div>
                </div>
                <h3 className="cs_post_title">
                  <Link href={blog.link}>{blog.title}</Link>
                </h3>
                <p className="cs_post_subtitle">{blog.subtitle}</p>
                <Link href={blog.link} className="cs_post_btn">
                  <span>{blog.linkText}</span>
                  <span>
                    <i>
                      <FaAngleRight />
                    </i>
                  </span>
                </Link>
                <div className="cs_post_shape position-absolute" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsSection1;
