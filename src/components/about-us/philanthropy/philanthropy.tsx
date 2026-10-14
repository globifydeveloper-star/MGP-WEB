import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AboutUsPageData } from '@/lib/strapi';
import './philanthropy.css';
import f1Img from '@/assets/images/f1.jpg';
import f3Img from '@/assets/images/f3.png';

interface PhilanthropyProps { data?: AboutUsPageData | null; }

export default function Philanthropy({ data }: PhilanthropyProps) {
  const initiativeTitle = data?.philanthropyInitiativeTitle && data.philanthropyInitiativeTitle !== 'HEEL Initiative'
    ? data.philanthropyInitiativeTitle
    : 'Muthoot Football Academy';
  const primaryImg = data?.philanthropyImages?.[0] || f1Img;
  const secondaryImg = data?.philanthropyImages?.[1] || f3Img;

  return (
    <section className="philanthropy-section">
      <div className="container">
        <div className="philanthropy-header">
          <span className="philanthropy-subtitle">{data?.philanthropySubtitle || 'Social Commitment'}</span>
          <h2 className="philanthropy-title">
            {data?.philanthropyTitle ? (
              <span dangerouslySetInnerHTML={{ __html: require('isomorphic-dompurify').sanitize(data.philanthropyTitle) }} />
            ) : (
              <>Our Unwavering Focus on <span className="gold-text">Philanthropy</span></>
            )}
          </h2>
          <p className="philanthropy-desc">
            {data?.philanthropyDescription || 'Armed with a commitment to society, the Group set up the Muthoot Pappachan Foundation (MPF), a Public Charitable Trust and the CSR arm of MPG.'}
          </p>
        </div>

        {/* Muthoot Football Academy CSR Initiative */}
        <div className="football-academy-container">
          <div className="football-academy-content">
            <h3 className="football-academy-title">{initiativeTitle}</h3>
            <p className="football-academy-desc">
              {data?.philanthropyInitiativeDesc && !data.philanthropyInitiativeDesc.includes('HEEL') ? (
                <span dangerouslySetInnerHTML={{ __html: require('isomorphic-dompurify').sanitize(data.philanthropyInitiativeDesc) }} />
              ) : (
                <>
                  The Muthoot Football Academy, a flagship initiative of the Muthoot Pappachan Foundation&apos;s sports division, aims to identify and train young football talents to become future stars. With a curriculum designed by international coaches, the Academy focuses on grassroots talent from districts where football is popular, conducting talent hunts in Kozhikode, Kochi, and Thiruvananthapuram. Forty-two selected talents receive comprehensive training, high-quality education, nutrition, healthcare, life skills, and career training. The Academy, a full-fledged residential facility near several schools, offers scholarships covering all expenses, including schooling, food, medical insurance, and accommodation. Students also benefit from physiotherapy services and participate in competitive matches and tournaments to hone their skills.
                </>
              )}
            </p>
          </div>

          <Link
            href={data?.philanthropyLink || '/community'}
            className="football-academy-visual"
            aria-label="Explore our community initiatives"
          >
            <div className="football-academy-img-primary-wrap">
              <Image
                src={primaryImg}
                alt={`${initiativeTitle} - Training Future Stars`}
                className="football-academy-img-primary"
                fill
                sizes="(max-width: 992px) 90vw, 500px"
                priority
              />
            </div>
            <div className="football-academy-img-secondary-wrap">
              <Image
                src={secondaryImg}
                alt={`${initiativeTitle} - Team Celebration`}
                className="football-academy-img-secondary"
                fill
                sizes="(max-width: 992px) 50vw, 320px"
              />
            </div>
          </Link>
        </div>

        <div className="philanthropy-conclusion">
          <p>
            {data?.philanthropyConclusion ? (
              <span dangerouslySetInnerHTML={{ __html: require('isomorphic-dompurify').sanitize(data.philanthropyConclusion) }} />
            ) : (
              <>We believe in building a <strong>&ldquo;Business Without Boundaries&rdquo;</strong>, where obstacles are treated as stepping stones to growth. We strive to take the world forward with perseverance, commitment, and sincerity. Indeed, the possibilities are infinite!</>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
