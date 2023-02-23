

import dynamic from 'next/dynamic'
import { handleError } from "../lib/helper";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Map = dynamic(() => import('../components/Map'), { ssr: false })

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name);
        if (name === '', email === '', subject === '', text === '') {
            toast.error("All items on our contact form are required.")
            return
        }

        try {
            setLoading(true)
            const res = await axios.post("/contact-us", {
                name,
                email,
                subject,
                text
            })
            toast.success('Your message was registered. ');
        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (

      <>
        <section className="book_section layout_padding">
    <div className="container">
      <div className="heading_container">
        <h2>
          Book A Table
        </h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form_container">
            <form onSubmit={handleSubmit}>
              <div>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div>
                <input onChange={(e) => setSubject(e.target.value)} value={subject} type="text" className="form-control" placeholder="subject" />
              </div>
              <div>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div>
                <textarea onChange={(e) => setText(e.target.value)} value={text} rows="10" style={{ height: '100px' }} className="form-control"
                    placeholder="text"></textarea>
            </div>
            <div className="btn-box">
                <button className="btn1" type="submit " disabled={loading}>
                    Send Message
                    {loading && <div className="spinner-border spinner-border-sm ml-2"></div>}
                </button>
            </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <Map />
          </div>
      </div>
    </div>
  </section>
      </>
    )
}

export default ContactForm;