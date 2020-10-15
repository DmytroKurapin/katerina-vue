export const createSEOMeta = ({ title, description, url, image }) => {
  return [
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'description', name: 'description', content: description },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description
    },
    { hid: 'og:image', property: 'og:image', content: process.env.hostName + image },
    {
      hid: 'og:url',
      property: 'og:url',
      content: process.env.hostName + url
    }

    // todo check instagramm, FB cards

    // {
    //   hid: 'twitter:card',
    //   name: 'twitter:card',
    //   content: data.cardType || 'summary_large_image'
    // },
    // {
    //   hid: 'twitter:site',
    //   name: 'twitter:site',
    //   content: '@dimakurapin',
    // },
    // {
    //   hid: 'twitter:creator',
    //   name: 'twitter:creator',
    //   content: '@dimakurapin',
    // },
    // {
    //   hid: 'twitter:title',
    //   name: 'twitter:title',
    //   content: 'This is title',
    // },
    // {
    //   hid: 'twitter:description',
    //   name: 'twitter:description',
    //   content:'this is description',
    // },
  ];
};
