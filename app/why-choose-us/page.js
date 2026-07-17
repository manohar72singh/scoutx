// app/why-choose-us/page.js

import Link from 'next/link';

export const metadata = {
  title: 'Why Choose ScoutX — PSARA Licensed, Police Verified Security Guards',
  description:
    'Discover why ScoutX Protection Group is Ghaziabad\'s most trusted security agency. PSARA license, police verification, 160+ hours training, insurance, and GPS attendance tracking.',
};

const credentials = [
  {
    icon: '📋',
    title: 'PSARA Licensed',
    value: 'License No: UP-PSARA-XXXX',
    desc: 'We are fully licensed under the Private Security Agencies Regulation Act (PSARA) by the competent authority of Uttar Pradesh. This is your legal guarantee that ScoutX operates within the law — protecting you from liability when you hire from an unlicensed agency.',
    highlight: true,
  },
  {
    icon: '🔎',
    title: 'Police Verification — 100%',
    value: 'No Exceptions',
    desc: 'Every single guard deployed by ScoutX holds a current police clearance certificate from the relevant police station in their home district. We maintain these records for audit by clients at any time. No guard is deployed before this verification is complete.',
  },
  {
    icon: '🎓',
    title: '160+ Hours Training',
    value: 'Certified Guard Training',
    desc: 'Guards undergo a structured training programme covering: Law & the PSA Act | First aid & CPR | Fire safety & evacuation | Use-of-force and restraint protocols | Crowd control | Communication & report writing | Shift handover standards.',
  },
  {
    icon: '👔',
    title: 'Uniform & Equipment',
    value: 'Professional Appearance',
    desc: 'All guards are issued standardised uniforms, ID badges, and equipment appropriate for their assignment. Armed guards carry licensed weapons in holsters. On-site guards maintain daily duty registers visible to clients.',
  },
  {
    icon: '🔒',
    title: 'Fully Insured',
    value: 'Liability & Personnel Cover',
    desc: 'ScoutX carries comprehensive insurance covering guard personnel and third-party liability. If an incident occurs involving our guards on your premises, you are protected from financial exposure.',
  },
  {
    icon: '📱',
    title: 'GPS & Supervisor Rounds',
    value: 'Real-Time Accountability',
    desc: 'Field supervisors conduct unannounced visits to all client sites. Guards submit GPS-verified attendance check-ins. Clients receive a dedicated point-of-contact reachable 24/7 for any service issue.',
  },
  {
    icon: '⚡',
    title: '24-Hour Response',
    value: 'Same-Day Relief Guards',
    desc: 'If a deployed guard fails to report or requires urgent replacement, we guarantee same-day deployment of a relief guard to your site — ensuring zero coverage gap.',
  },
  {
    icon: '📄',
    title: 'Transparent Contracts',
    value: 'No Hidden Charges',
    desc: 'Our service agreements spell out deployment schedules, rates, escalation procedures, and termination clauses clearly. We welcome client-side legal review before signing.',
  },
];

export default function WhyChooseUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">Our Credentials</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Why <span className="text-gradient-steel">Choose ScoutX</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            When you hire a security agency, you're trusting them with your people, your assets, and your reputation. Here's what sets us apart.
          </p>
        </div>
      </section>

      {/* Credentials grid */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-6xl mx-auto">
          {/* PSARA badge — prominent */}
          <div
            className="mb-8 p-6 rounded-xl border-2 text-center md:text-left md:flex items-center gap-8"
            style={{ borderColor: 'rgba(46,111,191,0.5)', background: 'rgba(30,77,140,0.15)' }}
          >
            <div className="text-6xl mb-4 md:mb-0">🛡️</div>
            <div>
              <div className="text-[#4A8FD4] font-heading text-xs font-bold uppercase tracking-widest mb-1">Government Regulated</div>
              <h2 className="font-heading text-3xl font-bold uppercase text-white mb-2">PSARA License: UP-PSARA-XXXX</h2>
              <p className="text-[#A8A8A8] text-sm max-w-2xl">
                Hiring from an unlicensed security agency is illegal under the PSA Act and exposes your organisation to liability. ScoutX is fully PSARA-licensed by the Government of Uttar Pradesh. Ask us for a copy of our license at any time.
              </p>
            </div>
          </div>

          {/* Other credentials */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {credentials.slice(1).map((c) => (
              <div key={c.title} className="card-dark p-6">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="inline-block px-2 py-0.5 bg-[rgba(46,111,191,0.15)] text-[#4A8FD4] text-xs font-heading font-bold uppercase tracking-wider rounded mb-2">
                  {c.value}
                </div>
                <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-2">{c.title}</h3>
                <p className="text-[#A8A8A8] text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-bold uppercase text-white">
              ScoutX vs. <span className="text-gradient-silver">Unorganised Agencies</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="text-[#4A8FD4]">ScoutX ✓</th>
                  <th className="text-red-400">Typical Unlicensed Agency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['PSARA License', '✅ Yes', '❌ Often missing'],
                  ['Police Verification', '✅ 100% of guards', '⚠️ Inconsistent'],
                  ['Formal Training', '✅ 160+ hours', '❌ On-the-job at best'],
                  ['Insurance Coverage', '✅ Full liability', '❌ None'],
                  ['Supervisor Checks', '✅ GPS + unannounced', '❌ Rarely'],
                  ['Replacement Guarantee', '✅ Same-day', '❌ Not guaranteed'],
                  ['Transparent Contract', '✅ Always', '⚠️ Verbal agreements common'],
                ].map(([feat, yes, no]) => (
                  <tr key={feat}>
                    <td className="font-medium text-[#E8E8E8]">{feat}</td>
                    <td className="text-green-400 font-medium">{yes}</td>
                    <td className="text-red-400">{no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(192,192,192,0.1)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold uppercase text-white mb-4">
            Verified. Trained. Insured. Ready.
          </h2>
          <p className="text-[#A8A8A8] mb-6">Get your customised security deployment from a fully compliant agency.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" className="btn-primary">Request a Quote</Link>
            <a href="tel:+918682066666" className="btn-secondary">Call Ashok Choudhary: 86820 66666</a>
          </div>
        </div>
      </section>
    </>
  );
}
