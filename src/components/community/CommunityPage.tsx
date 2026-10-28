import React from 'react';
import Image, { StaticImageData } from 'next/image';
import './CommunityPage.css';
import muthootLogo from '@/assets/images/muthootlogo.png';
import butterfliesImg from '@/assets/images/community/Butterflies.jpg';
import counsellingImg from '@/assets/images/community/card-expenses.png';
import educationImg from '@/assets/images/community/education.jpg';
import homeImg from '@/assets/images/community/home.png';
import volleyball1Img from '@/assets/images/community/v1.png';
import volleyball2Img from '@/assets/images/community/v2.jpg';
import rajasthanImg from '@/assets/images/community/cmd.jpg';
import football1Img from '@/assets/images/f1.jpg';
import football3Img from '@/assets/images/f3.png';
import type { CommunityPageData } from '@/lib/strapi';

const STAKEHOLDERS = [
  'Customers',
  'Employees',
  'Corporate',
  'Government Sector',
  'Public Sector',
  'Marginalised Communities',
  'Other stakeholders (NGOs, Corporate partners)',
];

const SUSTAINABILITY_AIMS = [
  "Effectively communicate the organisation's goals and direction",
  "Enhance the brand's value and reputation",
  'Work for long-term sustainability for the organisation and society',
  'Improve financial performance',
  'Build a relationship with businesses in the community and local authorities',
  'Build good relations with government and communities',
  'Have a license to operate',
];

const SMILE_STATS = [
  { value: '10,000', label: 'Muthoot Pappachan Group staff involved in the mission' },
  { value: '10 Lakh+', label: 'People covered through the outreach' },
  { value: '2 Lakh', label: 'Families covered in the awareness mission' },
  { value: '600+', label: 'Medical volunteers associated with the mission' },
];

const JEEVAN_JYOTHI_AIMS = [
  'Shelter to children of women in prostitution',
  "Provide education and a 'safe home' to live",
  'Pre-school for children aged 3 to 5 years',
  'Free medical counselling',
  'Weekly fellowship meetings to provide a sense of community',
  'Help bring them out of the vicious circle of their circumstance',
];

interface Initiative {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  extra?: { title: string; text: string };
  images?: { primary: StaticImageData; secondary?: StaticImageData; alt: string; wide?: boolean };
}

const INITIATIVES: Initiative[] = [
  {
    id: 'blue-butterflies',
    eyebrow: 'Health',
    title: 'Blue Butterflies',
    paragraphs: [
      "The project focusses on providing treatment preparedness support to paediatric cancer patients. The preparedness support provided boosts the family's willpower to continue the treatment and remain emotionally available to the child throughout the recovery process. The field outreach covers almost all the major hospitals throughout Kerala, so the most deserving cases are identified and provided support. If they require further treatment options, the same is facilitated with the support of the project.",
    ],
    extra: {
      title: 'General Treatment Support',
      text: 'General treatment support is extended to people who are finding difficulty in managing demanding medical expenses. The support helps them continue with their treatment requirements.',
    },
    images: { primary: butterfliesImg, alt: 'Blue Butterflies - paediatric cancer care support' },
  },
  {
    id: 'bhodhini',
    eyebrow: 'Education',
    title: 'Bhodhini Counselling Center',
    paragraphs: [
      'Bhodhini Counselling Centre functions towards the counselling of adolescents and youngsters. The scheme was able to cover 800 individuals through group counselling. Lack of concentration, anger issues and relationship issues are also addressed alongside. Anger management, couple counselling, activity scheduling, tele-counselling and relaxation techniques are some of the mitigation strategies adopted.',
    ],
    extra: {
      title: 'Other Educational Support',
      text: 'Educational support is extended to students from underprivileged sections of society who are not able to complete their academics.',
    },
    images: { primary: educationImg, secondary: counsellingImg, alt: 'Bhodhini Counselling Center' },
  },
  {
    id: 'rebuilding-kerala',
    eyebrow: 'Livelihood',
    title: 'Rebuilding Kerala',
    paragraphs: [
      "In response to the severe floods that hit Kerala on August 16, 2018, the Muthoot Pappachan Foundation supported the government's rebuilding efforts by constructing homes for those who lost theirs. The floods, one of the worst in a century, resulted in numerous deaths, missing persons, and over a million evacuations.",
      'The foundation planned 48 housing units across five locations in Pathanamthitta: Chittar, Mezhuveli, Kadambanad, Kadapra, and Ayiroor. All planned houses in all the mentioned locations have been completed and handed over to beneficiaries.',
    ],
    images: { primary: homeImg, alt: 'Rebuilding Kerala - homes for flood-affected families' },
  },
  {
    id: 'volleyball-academy',
    eyebrow: 'Sports',
    title: 'Muthoot Volleyball Academy',
    paragraphs: [
      'The Muthoot non-residential volleyball academy was started in Ernakulam district in November 2021 with 4 schools and the surrounding areas. 240 boys and girls were shortlisted, and after screening, 120 students were covered under the project.',
    ],
    images: { primary: volleyball2Img, secondary: volleyball1Img, alt: 'Muthoot Volleyball Academy' },
  },
  {
    id: 'blind-cricket',
    eyebrow: 'Sports',
    title: 'Cricket Association for Blind in Kerala',
    paragraphs: [
      'For supporting, advancing and popularising blind cricket, the Cricket Association for Blind in Kerala (CABK) has developed various platforms for visually impaired men to showcase their talents in cricket. The Cricket Association for the Blind in India (CABI), which is connected to the World Blind Cricket Council, is the parent organisation of CABK, a recognised association under the Societies Registration Act of 1860.',
      "Various interstate matches and coaching camps were organised for the participants, which lay an important milestone in the lives of the players. Through the extended support of MPF, the team was able to build improved player training, uniforms and equipment, jerseys and shoes, travel for tournaments, branding and promotion, player food and lodging, coach fees and ground rent. The players' smiles conveyed dignity, and their confidence grew after the tournaments.",
    ],
  },
  {
    id: 'rajasthan-project',
    eyebrow: 'Environment',
    title: 'Rajasthan Project with RRF and JRF',
    paragraphs: [
      'The collaborative work undertaken by the Royal Rajasthan Foundation and the Muthoot Pappachan Foundation works towards capacity building for women to enable access to water. Workshops and capacity building are aimed towards the women of the community. Agriculture and water management, WASH, financial literacy, mental health awareness, TOT sessions for grassroots leaders and exposure visits are some of the focus areas among the community.',
      'Water harvesting structures and farm ponds are developed for the project. 25,000+ saplings have been planted, and the responsibility of caring for them is undertaken by the community itself — making the community the true owner of the project.',
    ],
    images: { primary: rajasthanImg, alt: 'Visit of Directors to Samarpura Region to meet the women engaged in rug weaving', wide: true },
  },
  {
    id: 'disability-rehabilitation',
    eyebrow: 'Health',
    title: 'Disability and Rehabilitation',
    paragraphs: [
      'The Aashiana Rehabilitation Training Centre, supervised by Dr. Mitu C. Shekhar and a multidisciplinary team, provides residential rehab training for patients immobilised due to accidents, paralysis, or spinal cancer. It aims to help paraplegic individuals regain physical and psychological functioning to become contributing members of society.',
      'The Centre offers free treatment, food, and accommodation for low-income residents and treats various conditions, including brain and spinal cord injuries, strokes, cerebral palsy, and joint-related diseases. Services include customised wheelchairs, calipers, and a Pain Clinic addressing shoulder, neck, knee, and back pain. Since its inception, 183 patients have benefited from the Centre.',
    ],
  },
];

function CheckIcon() {
  return (
    <span className="community-check" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
  );
}

export default function CommunityPage({ data }: { data?: CommunityPageData | null }) {
  const displayInitiatives = INITIATIVES.map((item) => {
    if (item.id === 'smile' && (data?.smileTitle || data?.smileDescription)) {
      return {
        ...item,
        title: data.smileTitle || item.title,
        paragraphs: data.smileDescription ? [data.smileDescription] : item.paragraphs,
      };
    }
    if (item.id === 'football' && (data?.footballTitle || data?.footballDescription)) {
      return {
        ...item,
        title: data.footballTitle || item.title,
        paragraphs: data.footballDescription ? [data.footballDescription] : item.paragraphs,
      };
    }
    if (item.id === 'volleyball' && (data?.volleyballTitle || data?.volleyballDescription)) {
      return {
        ...item,
        title: data.volleyballTitle || item.title,
        paragraphs: data.volleyballDescription ? [data.volleyballDescription] : item.paragraphs,
      };
    }
    return item;
  });

  return (
    <main className="community-page">
      {/* Hero */}
      <section className="community-hero">
        <div className="container">
          <div className="community-hero-grid">
            <div className="community-hero-content">
              <span className="community-eyebrow">Muthoot Pappachan Foundation</span>
              <h1 className="community-hero-title">
                {data?.heroTitle ? (
                  <span dangerouslySetInnerHTML={{ __html: data.heroTitle }} />
                ) : (
                  <>Committed to the <span className="gold-text">Community</span></>
                )}
              </h1>
              <p className="community-text" style={{ whiteSpace: 'pre-line' }}>
                {data?.heroSubtitle || 'Armed with a commitment to society, the Muthoot Pappachan Foundation (MPF), a Public Charitable Trust — the CSR arm of Muthoot Pappachan Group (MPG) — was formed and has touched thousands of lives through its diverse programs. It tackles issues affecting the communities in which its businesses operate.'}
              </p>
              <p className="community-text">
                Our primary aim is to build a portfolio of CSR activities that are in line with our core strengths as a business and our various business units. Such CSR initiatives of MPG revolve around the theme &lsquo;HEEL&rsquo;, covering Health, Education, Environment and Livelihood.
              </p>
              <div className="community-heel">
                {['Health', 'Education', 'Environment', 'Livelihood'].map((item) => (
                  <div key={item} className="community-heel-item">
                    <span className="community-heel-letter">{item.charAt(0)}</span>
                    <span className="community-heel-label">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="community-hero-media community-hero-logo">
              <Image
                src={muthootLogo}
                alt="Muthoot Pappachan Group logo"
                className="community-hero-logo-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role of MPF */}
      <section className="community-section community-section-alt">
        <div className="container">
          <div className="community-header">
            <span className="community-eyebrow">Our Foundation</span>
            <h2 className="community-title">
              {data?.heelTitle ? (
                <span dangerouslySetInnerHTML={{ __html: data.heelTitle }} />
              ) : (
                <>Role of <span className="gold-text">Muthoot Pappachan Foundation</span></>
              )}
            </h2>
            <p className="community-text" style={{ whiteSpace: 'pre-line' }}>
              {data?.heelDescription || 'Muthoot Pappachan Foundation spearheads the planning and execution of CSR initiatives aligned with organisational objectives, driving impactful programs across various Group companies. The core aim of the Foundation is to facilitate all the CSR activities and programmes of the entire Group, which are bound by the theme HEEL — Health, Education, Environment and Livelihood. MPF facilitates company-level and Group-level CSR activities adhering to this theme for the following stakeholders:'}
            </p>
          </div>

          <h3 className="community-subheading community-center">Key Values and Vision</h3>
          <ul className="community-chips">
            {STAKEHOLDERS.map((item) => (
              <li key={item} className="community-chip">{item}</li>
            ))}
          </ul>

          <div className="community-objectives">
            <h3 className="community-subheading">The CSR Objectives of the Muthoot Pappachan Foundation</h3>
            <p className="community-text">
              With a long-term and futuristic perspective, the entire range of CSR activities undertaken by the various group companies is streamlined through the Foundation — to build a framework of CSR activities with a philanthropic approach in line with business unit objectives, which also benefits the organisation at large.
            </p>
            <ul className="community-checklist">
              <li><CheckIcon />Social returns together with financial returns, while imbibing the organisation&apos;s ethos and value systems.</li>
              <li><CheckIcon />Build sustainability for the organisation by &lsquo;Engaging the Community&rsquo;.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sustainability Mission */}
      <section className="community-section">
        <div className="container">
          <div className="community-split">
            <div>
              <span className="community-eyebrow">Sustainability</span>
              <h2 className="community-title">
                Understanding our Mission of <span className="gold-text">Sustainability</span>
              </h2>
              <p className="community-text">
                Under the sustainability mission, MPF partners with projects to ensure long-term sustainability. We plan and implement strategic CSR initiatives that are a blend of philanthropy and business, looking for the combined social and economic benefit of all stakeholders.
              </p>
            </div>
            <div className="community-card">
              <h3 className="community-subheading">With our sustainability mission, we aim to:</h3>
              <ul className="community-checklist">
                {SUSTAINABILITY_AIMS.map((item) => (
                  <li key={item}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reach & Impact + Smile Mission */}
      <section className="community-section community-section-dark">
        <div className="bg-overlay" />
        <div className="container">
          <div className="community-header">
            <span className="community-eyebrow">Reach &amp; Impact</span>
            <h2 className="community-title community-title-light">
              The Reach &amp; Impact of Our <span className="gold-text">CSR Activities</span>
            </h2>
            <p className="community-text community-text-light">
              Muthoot Blue is at the forefront of promoting CSR activities through its various branches and companies. We are actively involved in engaging with the underprivileged groups and marginalised sections of society through intelligently conceived and executed programmes. The benefits received by our stakeholders encourage us to continue our long-term focus on, and support in, the areas of health, education and livelihood. Our focus is on empowerment, which has had an indelible impact on the communities as a whole.
            </p>
          </div>

          <div className="community-smile">
            <div className="community-smile-content">
              <span className="community-badge">Among India&apos;s 11 best CSR projects — MCA</span>
              <h3 className="community-subheading community-subheading-light">Smile Mission</h3>
              <p className="community-text community-text-light">
                The Muthoot Pappachan Foundation&apos;s &ldquo;Smile Please&rdquo; initiative supports children from lower socio-economic backgrounds with congenital cleft lip/palate by providing free surgeries, comprehensive care including speech therapy, and raising awareness about the condition. This project is executed in partnership with the medical charity organisation &ldquo;Mission Smile&rdquo;, a pioneer in the country&apos;s cleft lip space.
              </p>
              <p className="community-text community-text-light">
                The &lsquo;Smile Please&rsquo; mission was implemented across the country and has been acknowledged by IICA / Ministry of Corporate Affairs as one among the 11 best CSR initiatives of India.
              </p>
            </div>
            <div className="community-stats">
              {SMILE_STATS.map((stat) => (
                <div key={stat.label} className="community-stat">
                  <span className="community-stat-value gold-text">{stat.value}</span>
                  <span className="community-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="community-section">
        <div className="container">
          <div className="community-header">
            <span className="community-eyebrow">Our Initiatives</span>
            <h2 className="community-title">
              Programs That <span className="gold-text">Change Lives</span>
            </h2>
          </div>

          <div className="community-initiatives">
            {displayInitiatives.map((item, idx) => (
              <article
                key={item.id}
                id={item.id}
                className={`community-initiative${idx % 2 === 1 ? ' is-reversed' : ''}${item.images ? '' : ' no-media'}${item.images?.wide ? ' is-wide' : ''}`}
              >
                <div className="community-initiative-content">
                  <span className="community-tag">{item.eyebrow}</span>
                  <h3 className="community-initiative-title">{item.title}</h3>
                  {item.paragraphs.map((p, i) => (
                    <p key={i} className="community-text">{p}</p>
                  ))}
                  {item.extra && (
                    <div className="community-extra">
                      <h4 className="community-extra-title">{item.extra.title}</h4>
                      <p className="community-text">{item.extra.text}</p>
                    </div>
                  )}
                </div>

                {item.images && (
                  <div className={`community-initiative-media${item.images.secondary ? ' has-secondary' : ''}`}>
                    <div className="community-media-primary">
                      <Image
                        src={item.images.primary}
                        alt={item.images.alt}
                        className="community-img"
                        sizes={item.images.wide ? '(max-width: 1024px) 100vw, 1280px' : '(max-width: 1024px) 100vw, 600px'}
                        quality={item.images.wide ? 90 : undefined}
                      />
                    </div>
                    {item.images.secondary && (
                      <div className="community-media-secondary">
                        <Image
                          src={item.images.secondary}
                          alt={`${item.images.alt} - highlights`}
                          className="community-img"
                          sizes="(max-width: 1024px) 60vw, 320px"
                        />
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MELP - Jeevan Jyothi */}
      <section className="community-section community-section-alt">
        <div className="container">
          <div className="community-split">
            <div>
              <span className="community-eyebrow">MELP Initiatives</span>
              <h2 className="community-title">
                Jeevan Jyothi: <span className="gold-text">Providing More Light to Lives</span>
              </h2>
              <p className="community-text">
                MPF supports Jeevan Jyothi, a charitable foundation working in the red-light district of Budhwar Peth in Pune. Through this, we help provide a &lsquo;safe home&rsquo; for the children of women in prostitution and help them realise that there is more to life than what they perceive. We believe that educating neglected community children and giving them a safe environment will help them come out of the vicious circles they are trapped in.
              </p>
            </div>
            <div className="community-card">
              <h3 className="community-subheading">Through Jeevan Jyothi, we aim to:</h3>
              <ul className="community-checklist">
                {JEEVAN_JYOTHI_AIMS.map((item) => (
                  <li key={item}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Muthoot Football Academy */}
      <section className="community-section">
        <div className="container">
          <article className="community-initiative">
            <div className="community-initiative-content">
              <span className="community-tag">Sports</span>
              <h3 className="community-initiative-title">Muthoot Football Academy</h3>
              <p className="community-text">
                The Muthoot Football Academy, a flagship initiative of the Muthoot Pappachan Foundation&apos;s sports division, aims to identify and train young football talents to become future stars. With a curriculum designed by international coaches, the Academy focuses on grassroots talent from districts where football is popular, conducting talent hunts in Kozhikode, Kochi, and Thiruvananthapuram.
              </p>
              <p className="community-text">
                Forty-two selected talents receive comprehensive training, high-quality education, nutrition, healthcare, life skills, and career training. The Academy, a full-fledged residential facility near several schools, offers scholarships covering all expenses, including schooling, food, medical insurance, and accommodation. Students also benefit from physiotherapy services and participate in competitive matches and tournaments to hone their skills.
              </p>
            </div>
            <div className="community-initiative-media has-secondary">
              <div className="community-media-primary">
                <Image src={football1Img} alt="Muthoot Football Academy - training future stars" className="community-img" sizes="(max-width: 1024px) 100vw, 600px" />
              </div>
              <div className="community-media-secondary">
                <Image src={football3Img} alt="Muthoot Football Academy - team celebration" className="community-img" sizes="(max-width: 1024px) 60vw, 320px" />
              </div>
            </div>
          </article>

          <div className="community-conclusion">
            <p>
              Muthoot Exim, the <strong>precious metal vertical of the Muthoot Pappachan Group</strong>, specialises in innovative products and offerings in the precious metal space. Customers have access to quality products that meet the highest standards, at an affordable price. For more details on the Muthoot Pappachan Group, visit{' '}
              <a href="https://www.muthoot.com" target="_blank" rel="noopener noreferrer">www.muthoot.com</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
