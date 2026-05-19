"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const BlogsLeft = ({ data }) => {
  return (
    <div className="col-lg-8">
      <div className="cs_post_details cs_style_1">

        {/* Featured image */}
        <div className="cs_post_thumb_thumbnail" style={{ position: 'relative', height: 486, overflow: 'hidden', borderRadius: 8 }}>
          <Image
            src={data.imageSrc}
            alt="Post image"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 856px"
          />
        </div>

        {/* Meta */}
        <ul className="cs_post_meta cs_mp0">
          <li><i><FaUser /></i>{data.text}</li>
          <li><i><FaCalendarAlt /></i>{data.secText}</li>
        </ul>

        {/* Content — HTML from rich editor or plain paragraphs */}
        {data.htmlContent
          ? <div className="cs_post_body" dangerouslySetInnerHTML={{ __html: data.htmlContent }} />
          : (data.content || []).map((p, i) => <p key={i}>{p}</p>)
        }

        {/* Comments */}
        {data.comments && data.comments.length > 0 && (
          <>
            <div className="cs_height_70 cs_height_lg_40" />
            <h2 className="cs_reply_title mb-0">{data.commentTitle}</h2>
            <ul className="cs_comment_list cs_mp0">
              {data.comments.map((comment, i) => (
                <li className="cs_comment_body" key={i}>
                  <div className="cs_comment_thumbnail">
                    <Image src={comment.avatarSrc} className="cs_radius_5" alt="img" width={90} height={90} />
                  </div>
                  <div className="cs_comment_info">
                    <h3>{comment.name}</h3>
                    <p>{comment.text}</p>
                    <div className="cs_comment_meta_wrapper">
                      <div className="cs_comment_date">
                        <span>{comment.date}</span>
                        <span>{comment.time}</span>
                      </div>
                      <Link href={comment.link} className="cs_reply_btn cs_accent_color">{comment.replay}</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Comment / appointment form */}
        <div className="cs_height_90 cs_height_lg_60" />
        <h2 className="cs_reply_heading">{data.thirdSecTitle}</h2>
        <form className="cs_reply_form row cs_row_gap_30 cs_gap_y_30" id="comment">
          <div className="col-md-6">
            <input type="text" name="name" placeholder="Your Name" className="cs_form_field" />
          </div>
          <div className="col-md-6">
            <input type="email" name="email" placeholder="Your Email" className="cs_form_field" />
          </div>
          <div className="col-md-12">
            <textarea name="message" rows={5} placeholder="Your Message" className="cs_form_field" />
          </div>
          <div className="col-md-12">
            <button type="submit" className="cs_btn cs_style_1 cs_color_1">Post Comment</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default BlogsLeft;
