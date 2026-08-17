-- ScoutX Protection Group — MySQL Schema
-- Run this file once to initialise the database

CREATE DATABASE IF NOT EXISTS scoutx_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE scoutx_db;

-- Quote / lead requests from B2B clients
CREATE TABLE IF NOT EXISTS leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(150),
  contact_person VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(150),
  city VARCHAR(100),
  guards_needed INT,
  service_type VARCHAR(100),
  message TEXT,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- Job applications from guard candidates
CREATE TABLE IF NOT EXISTS applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(150),
  position_applied VARCHAR(100),
  experience_years INT,
  resume_file_path VARCHAR(255),
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- Client testimonials (admin-managed)
CREATE TABLE IF NOT EXISTS testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_name VARCHAR(100),
  client_company VARCHAR(150),
  quote_text TEXT,
  logo_image_path VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts (admin-managed, SEO landing pages)
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  excerpt VARCHAR(300),
  content LONGTEXT NOT NULL,
  featured_image VARCHAR(255),
  meta_title VARCHAR(200),
  meta_description VARCHAR(300),
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_slug (slug)
);

-- Homepage closing CTA section (admin-editable, single row)
CREATE TABLE IF NOT EXISTS cta_content (
  id INT PRIMARY KEY DEFAULT 1,
  hero_image VARCHAR(255),
  eyebrow_text VARCHAR(100),
  heading_line1 VARCHAR(150),
  heading_line2 VARCHAR(150),
  description TEXT,
  primary_btn_text VARCHAR(100),
  primary_btn_link VARCHAR(255),
  whatsapp_btn_text VARCHAR(100),
  whatsapp_number VARCHAR(20),
  phone1_label VARCHAR(100),
  phone1_number VARCHAR(20),
  phone2_label VARCHAR(100),
  phone2_number VARCHAR(20),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Admin panel users
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: default admin (password: Admin@123 — change immediately after first login)
-- Password hash generated with bcrypt rounds=10
INSERT IGNORE INTO admin_users (username, password_hash)
VALUES ('scoutxsecurity@gmail.com', '$2b$10$9u3WNiDko6v2h.iklLX4NOGDGPz75UKLgkOonMxo0bAbbjG3KsmDK');

-- Seed: default homepage CTA content (matches current hardcoded copy)
INSERT IGNORE INTO cta_content (id, eyebrow_text, heading_line1, heading_line2, description, primary_btn_text, primary_btn_link, whatsapp_btn_text, whatsapp_number, phone1_label, phone1_number, phone2_label, phone2_number)
VALUES (1, 'TAKE ACTION TODAY', 'SECURE YOUR PREMISES', 'STARTING TODAY',
  'Get a customized security deployment plan within 24 hours. No obligation, no pushy sales — just an honest quote from our security experts.',
  'GET A FREE QUOTE', '/contact#quote', 'WHATSAPP US', '918682066666',
  'Ashok Choudhary', '+91 86820 66666', 'Anil Choudhary', '+91 76118 65555');

-- Seed: sample testimonials
INSERT IGNORE INTO testimonials (client_name, client_company, quote_text, is_featured) VALUES
('Rajesh Sharma', 'Green Valley RWA, Ghaziabad', 'ScoutX provided highly trained, disciplined guards for our society. Response time is excellent and the team is very professional. Highly recommended!', TRUE),
('Priya Mehta', 'TechCorp Pvt. Ltd., Noida', 'We have been using ScoutX for our office premises for over a year. Their guards are punctual, well-uniformed, and always vigilant. Great service!', TRUE),
('Amit Verma', 'Verma Textile Mills, Greater Noida', 'After switching to ScoutX, pilferage incidents in our factory dropped significantly. Their mobile patrol and supervisor checks give us real peace of mind.', TRUE);

-- Seed: sample blog posts
INSERT IGNORE INTO blog_posts (title, slug, excerpt, content, meta_title, meta_description, status, published_at) VALUES
('How Many Security Guards Does Your Residential Society Actually Need?', 'how-many-security-guards-does-your-residential-society-actually-need', 'A practical guide to right-sizing your society\'s guard deployment based on gates, shifts, and patrol coverage — so you\'re not over-paying or under-protected.', '<p>One of the most common questions we get from RWAs (Resident Welfare Associations) and society management committees in Ghaziabad, Noida, and across Delhi NCR is simple: <strong>how many security guards do we actually need?</strong> Hire too few and you leave gaps in coverage. Hire too many and you are paying for manpower you do not need.</p>

<h2>Start With Your Entry &amp; Exit Points</h2>
<p>The first factor is not the size of your society, it is the number of active gates and access points. Every vehicular gate that stays open through the day typically needs its own dedicated guard, especially if it also handles pedestrian and visitor movement. A single-gate society of 150 flats often needs fewer guards than a multi-gate township of the same size.</p>

<h2>Shift Planning: 8-Hour vs 12-Hour Rosters</h2>
<p>Most residential societies run three 8-hour shifts or two 12-hour shifts per gate, per day. That means a single gate staffed 24x7 needs a minimum of 3 to 4 guards on the roster (accounting for weekly offs and leave coverage) &mdash; not just one guard "per shift" on paper. This is where many societies under-budget and end up with unmanned gates during weekly-off rotations.</p>

<h2>Don\'t Forget Patrol &amp; Supervision</h2>
<p>Gate guards alone are not enough for larger societies. A dedicated night patrol guard, and a <a href="/services/security-supervisor">security supervisor</a> who conducts surprise checks across shifts, significantly reduces incidents of guard absenteeism, sleeping on duty, and unauthorized entry. For societies above 300 units, we generally recommend at least one supervisor visit per shift.</p>

<h2>A Quick Reference</h2>
<ul>
  <li><strong>Single gate, up to 100 flats:</strong> 3-4 guards (round-the-clock roster) + periodic supervisor visits</li>
  <li><strong>Single gate, 100-300 flats:</strong> 4-5 guards + 1 night patrol guard</li>
  <li><strong>Multi-gate township, 300+ flats:</strong> Dedicated guards per gate + night patrol + on-site or mobile supervisor</li>
</ul>

<p>These are starting benchmarks, not fixed rules &mdash; the right number also depends on your society\'s layout, parking structure, and past incident history. When ScoutX conducts a site visit, we walk the entire premises with your committee before recommending a deployment plan, so you are not over-paying or under-protected.</p>

<p>Looking to right-size your society\'s security deployment? <a href="/contact#quote">Get a free, no-obligation site assessment</a> from our team.</p>', 'How Many Security Guards Does a Society Need? | ScoutX', 'Practical benchmarks for sizing your residential society\'s security guard deployment in Ghaziabad, Noida & Delhi NCR — gates, shifts, and patrol coverage explained.', 'published', '2026-08-07 07:38:25'),
('PSARA License Explained: What It Means When You Hire a Security Agency in Delhi NCR', 'psara-license-explained-what-it-means-when-you-hire-a-security-agency-in-delhi-ncr', 'PSARA licensing isn\'t just paperwork — it determines whether your guards are actually police-verified and trained. Here\'s how to check before you hire.', '<p>If you are hiring a security agency anywhere in Uttar Pradesh or Delhi NCR, one term you will keep running into is <strong>PSARA</strong> &mdash; and it is not just legal fine print. It directly affects whether the guards standing at your gate are actually vetted, trained, and accountable.</p>

<h2>What Is PSARA?</h2>
<p>PSARA stands for the <strong>Private Security Agencies (Regulation) Act, 2005</strong>. It is the central law &mdash; implemented state-wise, including in Uttar Pradesh &mdash; that governs who is legally allowed to operate a private security agency. Without a valid PSARA license, an agency is operating outside the law, regardless of how professional their guards look in a uniform.</p>

<h2>Why It Matters to You, Not Just the Agency</h2>
<p>A PSARA license is not a paperwork formality &mdash; it comes with real obligations that protect you as the client:</p>
<ul>
  <li><strong>Police verification is mandatory.</strong> Every guard deployed by a PSARA-licensed agency must undergo police character verification before deployment.</li>
  <li><strong>Training standards apply.</strong> Licensed agencies are required to put guards through a minimum training curriculum, not just hand them a uniform.</li>
  <li><strong>Accountability exists.</strong> If something goes wrong, a licensed agency is traceable and answerable to the licensing authority &mdash; an unlicensed vendor is not.</li>
  <li><strong>Insurance &amp; compliance.</strong> Legitimate agencies typically carry Workmen\'s Compensation coverage for their guards, which matters if an on-duty incident occurs on your premises.</li>
</ul>

<h2>How to Verify an Agency\'s PSARA License</h2>
<p>Do not just take a company\'s word for it. Ask directly for their PSARA license number and the state it is registered under, and cross-check it matches the state you are hiring in (a UP-PSARA license does not automatically cover Delhi deployments, for example). A legitimate agency will produce this without hesitation.</p>

<h2>ScoutX Is PSARA Licensed &mdash; Here\'s What That Means for You</h2>
<p>ScoutX Protection Group Pvt. Ltd. operates under a valid UP-PSARA license. Every guard we deploy across Ghaziabad, Noida, Greater Noida, and the rest of Delhi NCR is 100% police-verified before their first day on site, and goes through our internal training process covering access control, visitor management, emergency response, and site-specific protocols.</p>

<p>Before you sign with any security vendor, ask the PSARA question first. <a href="/contact#quote">Talk to our team</a> if you would like to see our license details as part of your vendor evaluation.</p>', 'What Is PSARA License? Why It Matters When Hiring | ScoutX', 'Learn what a PSARA license means, why it\'s mandatory for security agencies in UP & Delhi NCR, and how to verify one before hiring guards.', 'published', '2026-08-07 07:38:25'),
('Armed vs Unarmed Security Guards: Which One Does Your Business Actually Need?', 'armed-vs-unarmed-security-guards-which-one-does-your-business-actually-need', 'Not every site needs an armed gunman, and not every high-value site is safe with unarmed staff. Here\'s a simple framework to decide.', '<p>Not every premises needs the same kind of security guard, and this is one of the most common mistakes businesses make &mdash; either over-hiring armed personnel where they are not needed, or under-securing a genuinely high-risk site with regular unarmed staff. Here is how to actually decide.</p>

<h2>When Unarmed Security Guards Are the Right Call</h2>
<p>For the vast majority of sites &mdash; residential societies, corporate offices, retail stores, schools, and hospitals &mdash; a trained <a href="/services/security-guard">unarmed security guard</a> is exactly what is needed. Their job is primarily deterrence, access control, visitor management, and rapid incident reporting, not armed confrontation. Escalating to armed personnel at a low-risk site adds cost without adding meaningful protection, and can even make visitors and staff uneasy.</p>

<h2>When You Actually Need an Armed Guard (Gunman)</h2>
<p>Licensed <a href="/services/security-guard-gunman">armed security guards</a>, often referred to as "gunmen," are reserved for genuinely high-value, high-risk environments where the presence of cash, precious metals, or high-value assets makes the site an active target. This typically includes:</p>
<ul>
  <li>Banks, ATMs, and cash-in-transit operations</li>
  <li>Jewellery showrooms and bullion storage</li>
  <li>Cash-counting centres and treasury operations</li>
  <li>High-value warehouses and select industrial sites</li>
</ul>
<p>Armed guards deployed by a licensed agency hold valid firearms licenses under the Arms Act, and are periodically re-trained in safe handling, de-escalation, and emergency protocols &mdash; deploying an armed guard is a serious commitment, not a status symbol.</p>

<h2>A Simple Way to Decide</h2>
<p>Ask yourself one question: <em>if this site were robbed today, would the loss be catastrophic and immediate (cash, gold, bullion), or would it be a slower-moving risk (theft, trespassing, unauthorized entry)?</em> Catastrophic, immediate-value risk generally justifies an armed guard. Slower-moving, access-control-type risk is almost always better served by trained unarmed guards backed by a strong <a href="/services/security-supervisor">supervisor</a> and patrol structure.</p>

<h2>Not Sure Which You Need?</h2>
<p>Most businesses that call us assuming they need armed guards actually need a well-managed unarmed deployment with better supervision and patrol discipline &mdash; and vice versa. Our team does a free risk assessment of your site before recommending either option, so you are not over- or under-securing your premises.</p>

<p><a href="/contact#quote">Get a free security assessment</a> and we\'ll tell you honestly which category your site falls into.</p>', 'Armed vs Unarmed Security Guards: How to Decide | ScoutX', 'A simple framework for choosing between armed and unarmed security guards for your business, based on real risk factors, not guesswork.', 'published', '2026-08-07 07:38:25');
