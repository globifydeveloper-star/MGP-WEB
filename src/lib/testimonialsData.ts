export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  photo?: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'SACHIN JONEJA',
    location: 'Mumbai',
    rating: 5,
    photo: '/sachin-joneja.png',
    text: 'My mother and I have sold some very old gold over the past few months to three different organizations. One was a branch of an old established famous Jeweller in Mumbai while two were only buyers of gold. Of these, our experience with Muthoot Gold Point has been by far the best. We were impressed with both the completely transparent and speedy procedure as well as the courteous and knowledgeable staff. The courteous staff translated the intent behind the transparent procedure into a positive experience for us as users of the service. We would gladly use this service again should the need arise and also recommend this service to others who want to sell gold.',
  },
  {
    name: 'Basvaraju',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    photo: '/Basvaraju.png',
    text: 'I wanted to sell some gold jewellery to pay for the construction of my house – my contractor had cheated us. I saw the MGP advertisement on a government bus and decided to meet them as I was in great need. My earlier experience of selling the gold had not been good. But, the salesperson at MGP sat and explained each process of how they value the gold. I was totally impressed by their transparency and detailing. The amount they quoted was enough for my needs.',
  },
  {
    name: 'Srinarayan',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    photo: '/Srinarayan.png',
    text: 'I can never forget Muthoot Gold Point. If I had not come to know about MGP at the right time, I could have lost everything. In family and business, money is tight, when you need it the most. At these times, if there is a provision to sell your gold, plot of land, house and silver, then you can meet your difficulties easily. In my experience, MGP is the best solution for all those people looking to sell their gold and silver.',
  },
  {
    name: 'Vijay Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'I was looking to pay the last year’s fee for my eldest son’s engineering college, I did not have enough money. My wife asked me to sell all our gold jewellery and coins we had collected over the years. I went to some local jewellers and was shocked – they offered less than half of the value of the gold. My wife’s kitty friend suggested Muthoot Gold Point. Since I had already been to more than 15 or more jewellers and buyers, I decided to try them also. I was very surprised to know about how they value.',
  },
  {
    name: 'AMAR SINGH',
    location: 'Delhi',
    rating: 5,
    photo: '/AMAR SINGH.png',
    text: "When my father needed an emergency by-pass, I took all the jewellery and sold gold for cash, I had to MGP, straight away. I had dealt with them earlier also. The first time I took a loan was from them to set up my parlor four years ago. Luckily, i was able to repay the money and get my gold back. I went to them as soon as the doctor told me and within minutes, they had assessed the true value of the gold. They gave me a receipt and transferred the money to my account. Thanks to their quick transfer and fair assessment, my father got his operation!",
  },
];
