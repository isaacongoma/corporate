"use client"
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa";
import SectionHeading from "../SectionHeading";
import Link from "next/link";
import Image from "next/image";

const BlogSection = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    fade: false,
    swipeToSlide: true,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    dotsClass: "cs_pagination cs_style_2",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container">
        <SectionHeading
          SectionSubtitle={data.sectionTitle}
          SectionTitle={data.sectionSubtitle}
          variant={"text-center"}
        />

        <div className="cs_height_50 cs_height_lg_50" />
        <div className="cs_slider cs_style_1 cs_slider_gap_24">
          <div className="cs_slider_container">
            <div className="cs_slider_wrapper">
              <Slider {...settings}>
                {(data.blogsData || []).map((blog, index) => (
                  <div key={index} className="cs_slide">
                    <article className="cs_post cs_style_1" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Link
                        href={blog.link}
                        className="cs_post_thumbnail position-relative"
                        style={{ display: 'block', height: 280, overflow: 'hidden', flexShrink: 0 }}
                      >
                        <Image src={blog.image} alt="img" fill style={{ objectFit: 'cover' }} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 396px" />
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
                            <Image src="/assets/img/icons/post_user_icon.png" alt="img" width={15} height={14} />
                            <span>By: {blog.author}</span>
                          </div>
                          <div className="cs_post_meta_item">
                            <Image src="/assets/img/icons/post_comment_icon.png" alt="img" width={14} height={13} />
                            <span>{blog.comments}</span>
                          </div>
                        </div>
                        <h3 className="cs_post_title">
                          <Link href={blog.link}>{blog.title}</Link>
                        </h3>
                        <p className="cs_post_subtitle">{blog.subtitle}</p>
                        <Link href={blog.link} className="cs_post_btn">
                          <span>{blog.linkText}</span>
                          <span><i><FaAngleRight /></i></span>
                        </Link>
                        <div className="cs_post_shape position-absolute" />
                      </div>
                    </article>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
