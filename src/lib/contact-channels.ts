export const contactChannels = {
  recruiting: {
    label: "Recruiting",
    email: "talent@vantauu.com",
  },
  general: {
    label: "Contact",
    email: "contact@vantauu.com",
  },
  partnerships: {
    label: "Partnerships",
    email: "partnerships@vantauu.com",
  },
} as const;

function withSubject(email: string, subject?: string) {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}

export const mailto = {
  recruiting: (subject?: string) =>
    withSubject(contactChannels.recruiting.email, subject),
  general: (subject?: string) => withSubject(contactChannels.general.email, subject),
  partnerships: (subject?: string) =>
    withSubject(contactChannels.partnerships.email, subject),
};

export const footerContactChannels = [
  {
    label: contactChannels.recruiting.label,
    email: contactChannels.recruiting.email,
    href: mailto.recruiting("Recruiting Inquiry"),
  },
  {
    label: contactChannels.general.label,
    email: contactChannels.general.email,
    href: mailto.general("General Inquiry"),
  },
  {
    label: contactChannels.partnerships.label,
    email: contactChannels.partnerships.email,
    href: mailto.partnerships("Partnership Inquiry"),
  },
] as const;
