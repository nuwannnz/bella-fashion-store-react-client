import React from 'react'
import Hero from '../../components/common/Hero';
import Title from '../../components/common/Title'
import { getAssetUrl } from "../../helpers/assets.helper";
import ContactDetails from '../../components/customer/ContactDetails';
import { Container} from 'react-bootstrap';
import '../../styles/ContactUs.css'


export default function ContactUs() {
        return(
            <div>
            
            
            <div className="contact-top">

            <div className="page-wrap flex align-center flex-c">
                <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
            </div>
            <Container>
            <h1>
            Got a question? Get in touch with our team today!</h1><h3>
            Shopping can at times be mesmerising, so if you have a question, we’re just a call away!
            </h3>
            </Container></div>

            <div className="contact-page">
                <div className="contact-content">     
                    <ContactDetails/>
                </div>
            </div>
            </div>
        ) 

    
    
}
