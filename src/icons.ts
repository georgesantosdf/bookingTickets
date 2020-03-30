import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

const shareButtonsIcons = [
    faTwitter, faLinkedinIn, faInstagram
  ];
  
  library.add(...shareButtonsIcons);