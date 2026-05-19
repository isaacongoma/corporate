"use client"
import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { useState } from "react";

const ContactSection = ({ data, reverseOrder }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Error occurred.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const FormContent = () => (
    <form className="cs_contact_form row cs_gap_y_30" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="cs_form_field" placeholder="Your name" required />
      </div>
      <div className="col-md-6">
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="cs_form_field" placeholder="Your email" required />
      </div>
      <div className="col-md-6">
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="cs_form_field" placeholder="Your Subject" />
      </div>
      <div className="col-md-6">
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="cs_form_field" placeholder="Your phone" />
      </div>
      <div className="col-lg-12">
        <textarea rows={5} name="message" value={formData.message} onChange={handleChange} className="cs_form_field" placeholder="Your message" required />
      </div>
      <div className="col-lg-12">
        <button type="submit" className="cs_btn cs_style_1 cs_color_1">
          Send Request
        </button>
        {status && <p style={{ marginTop: '10px' }}>{status}</p>}
      </div>
    </form>
  );

  return (
    <div className="container">
      <div className="row cs_gap_y_30">
        {reverseOrder ? (
          <>
            <div className="col-lg-6">
              <div className="cs_contact_thumbnail cs_pl-40">
                <div className="cs_teeth_shape">
                  <Image src={data.teethShapeImg} className="cs_spinner_img" alt="img" width={167} height={143} />
                </div>
                <div className="cs_contact_img">
                  <Image src={data.contactImg} alt="img" width={319} height={497} />
                </div>
                <div className="cs_contact_bg_shape">
                  <div className="cs_white_bg_shape" />
                  <div className={`cs_iconbox ${data.iconBox.style}`}>
                    <div className="cs_iconbox_icon cs_center">
                      <Image src={data.iconBox.icon} alt="img" width={62} height={62} />
                    </div>
                    <div className="cs_iconbox_right">
                      <h3 className="cs_iconbox_title">{data.iconBox.title}</h3>
                      <p className="cs_iconbox_subtitle mb-0">{data.iconBox.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <SectionHeading SectionSubtitle={data.sectionSubtitle} SectionTitle={data.SectionTitle} />
              <div className="cs_height_25 cs_height_lg_25" />
              <FormContent />
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-6">
              <SectionHeading SectionSubtitle={data.sectionSubtitle} SectionTitle={data.SectionTitle} />
              <div className="cs_height_25 cs_height_lg_25" />
              <FormContent />
            </div>
            <div className="col-lg-6">
              <div className="cs_contact_thumbnail cs_pl-40">
                <div className="cs_teeth_shape">
                  <Image src={data.teethShapeImg} className="cs_spinner_img" alt="img" width={167} height={143} />
                </div>
                <div className="cs_contact_img">
                  <Image src={data.contactImg} alt="img" width={319} height={497} />
                </div>
                <div className="cs_contact_bg_shape">
                  <div className="cs_white_bg_shape" />
                  <div className={`cs_iconbox ${data.iconBox.style}`}>
                    <div className="cs_iconbox_icon cs_center">
                      <Image src={data.iconBox.icon} alt="img" width={62} height={62} />
                    </div>
                    <div className="cs_iconbox_right">
                      <h3 className="cs_iconbox_title">{data.iconBox.title}</h3>
                      <p className="cs_iconbox_subtitle mb-0">{data.iconBox.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
