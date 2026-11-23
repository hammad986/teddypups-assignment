export const origin = 'https://puppy.instabizweb.com';
export const media = path => origin + '/media/' + path;
export const photo = (path, width = 640) => origin + '/_next/image?url=' + encodeURIComponent('/media/' + path) + '&w=' + width + '&q=75';
export const whatsapp = 'https://wa.me/919898124987?text=' + encodeURIComponent("Hi Insta Biz Web, I'd like to discuss a project.");
export const showroom = 'FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg';
export const logo = origin + '/brand/logo.png';

const availableRows = [
  ['maltipoo-max-male','Max','Maltipoo','Boy','3 months','Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp'],
  ['korean-teacup-maltipoo-female','','Korean Teacup Maltipoo','Girl','2 months','gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg'],
  ['korean-teacup-poodle-female','','Korean Teacup Poodle','Girl','2 months','xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg'],
  ['maltipoo-cavapoo-male','','Maltipoo & Cavapoo','Boy','3 months Maltipoo & 2 months Cavapoo','YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg'],
  ['toy-poodle-male-female','','Toy Poodle','Boy & girl','2 months','vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg'],
  ['maltipoo-female-2','','Maltipoo','Girl','3 months','3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg'],
  ['pomeranian-female','','Pomeranian','Girl','3 months','3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg'],
  ['copper-male','Copper','Cavapoo','Boy','2 months','O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg'],
  ['shitzu-female','','Shih Tzu','Girl','2 months','qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg'],
  ['shitzu-male','','Shih Tzu','Boy','2 months','crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg'],
  ['maltipoo-female-1','','Maltipoo','Girl','2.5 months','wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg'],
  ['maltipoo-female','','Maltipoo','Girl','2 months','lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg'],
  ['korean-teacup-pomeranian-1','','Korean Teacup Pomeranian','Girl','2 months','EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg'],
  ['korean-teacup-pomeranian','','Korean Teacup Pomeranian','Girl','2 months','vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg'],
  ['korean-teacup-pomeranian-male','','Korean Teacup Pomeranian','Boy','2 months','nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg'],
];

const archiveRows = [
  ['pomeranian-ace-boy','Ace','Pomeranian','Boy','mihUKGFCatU3/0461cca56e/27b888_bac41adfadc44dce846a1c3fd0cdb0de-mv2.avif'],
  ['poodle-leo-male','Leo','Poodle','Boy','QgFG5s09n-ss/81af626d2d/27b888_5f9a7189bb21477d832047aae2040921-mv2.avif'],
  ['maltipoo-mia-girl','Mia','Maltipoo','Girl','4vu6_PGfL64H/537c367d85/27b888_747a4667fec640c69aad9bc045d61ac6-mv2.avif',true],
  ['maltipoo-sadie-girl','Sadie','Maltipoo','Girl','159oT4F46uhk/b66c2be87f/27b888_ea6e7e0fcd43447d854657b6de98d4cb-mv2.avif'],
  ['blue-marle-pomeranian','','Pomeranian','Boy','bMSEHnYcBTFF/970fdc1ee6/27b888_5e612a215bf343328c08d99e0e9c5a37-mv2.avif'],
  ['pomsky-ollie-boy','Ollie','Pomsky','Boy','Qs2IHRk7OQIm/c16bea255c/27b888_ef3324a358d64858b4873a146574c3b9-mv2.avif'],
  ['maltipoo-bruno-boy','Bruno','Maltipoo','Boy','w-F8mJLs2gtj/f06147a6d3/27b888_301f58cbae624a1da36a79d46571043a-mv2.avif',true],
  ['maltese-buddy-male','Buddy','Maltese','Boy','5ygCaO2TQb3v/f23ade89fa/27b888_6053b478acb641d1865de22aef938977-mv2.avif',true],
  ['maltese-charlie-male','Charlie','Maltese','Boy','0c1rFiKXQLLk/75c6a20e15/27b888_b22287e7c1594de7ab2fba46eabea376-mv2.avif'],
  ['pomeranian-daisy-girl','Daisy','Pomeranian','Girl','d_ji2d9LVy0R/b19b4cf1c2/27b888_c6cbb607448f469a96d73f3bc42a992d-mv2.avif',true],
  ['pomeranian-bella-female','Bella','Pomeranian','Girl','9jwfs8kSZW7K/9b8ae31d11/27b888_ab014eabe44c4f6ebaacb9ef1869823f-mv2.avif'],
  ['poodle-teddy-male','Teddy','Poodle','Boy','9XFYXsuvjIcz/8d1efc8baa/27b888_430ebbf87dc84b93bcd0b61709a2eaa7-mv2.avif'],
  ['poodle-molly-female','Molly','Poodle','Girl','WZKcpiogRBW7/9ebcb8d165/27b888_2b9e32b056624a45b62f7d7b4ec7d105-mv2.avif',true],
  ['pomski-coco-girl','Coco','Pomsky','Girl','CXIzj6hYrmuI/eff60812df/27b888_ce94335cf4714a99a78c799f666f9323-mv2.avif'],
  ['pomsky-rosie-girl','Rosie','Pomsky','Girl','FhrW7pE84bji/f7c57baf49/27b888_08271c7de284451fb9c848757f4838fb-mv2.avif'],
  ['pomeranian-leo-boy','Leo','Pomeranian','Boy','5iCniMJshKud/8bfe42003c/27b888_84815fae2bd34283a7c79985cfc8b568-mv2.avif',true],
  ['poodle-molly-girl','Molly','Poodle','Girl','lsaKvJhLwHB4/4cf2a02ed1/27b888_5aa959cec570411a8bb9372abe23f5e9-mv2.avif'],
  ['poodle-rocky-boy','Rocky','Poodle','Boy','51aMfxO7oeVe/6b70c96b1e/27b888_77a51d530b694ba58bc207f2a23e8620-mv2.avif'],
  ['maltipoo-sophie-girl','Sophie','Maltipoo','Girl','PYYTxpqgo76_/ae53ae6d3c/27b888_0d89c05fa55c43d4b6d55d573be83e73-mv2.avif',true],
  ['maltipoo-lola-girl','Lola','Maltipoo','Girl','HPs4cYizPzy9/22b104e2c5/27b888_f24865b2456b46feb6ea6694fe90660f-mv2.avif',true],
  ['pomeranian-rex-boy','Rex','Pomeranian','Boy','QIIvMqQTe9jr/d997ae172e/27b888_14fd6ec24bd94522bd54a5ae345240b8-mv2.avif'],
  ['pomsky-finn-male','Finn','Pomsky','Boy','tEAwWspMD8iG/1f55440daf/27b888_c68794a6e9ee442abb522a1d88a1e8cd-mv2.avif'],
  ['maltipoo-zoe-girl','Zoe','Maltipoo','Girl','fxj_9aZOSxQM/90c10b9c91/27b888_89e442e0035442308fc87fe3d2837f1d-mv2.avif'],
  ['pomeranian-mimi-girl','Mimi','Pomeranian','Girl','BLOZLPixUcjE/ea8ee97fd9/27b888_870c748ca6ee45cf8e0a311232dfe289-mv2.avif',true],
  ['bichon-bailey-boy','Bailey','Bichon','Boy','fI-hlHuSwrRw/5eae9b6384/27b888_8d87239e23854214a8718ef8f02c2d50-mv2.avif',true],
  ['puppy','','Maltipoo','Girl','Cl0B4v8U3Y-d/3dea5a9fec/27b888_1ae70e063fd7451a87d4dfe79794d58f-mv2.avif'],
  ['maltipo','','Poodle','Girl','sFgPBojUhFBo/5ac1429cf4/27b888_aa0ce426ca3848abbc7d695f8c818568-mv2.avif',true],
];

const extraPhotos = {
  'korean-teacup-maltipoo-female': [
    'lrYgKCzauGW9/862b350f1f/b942a5_dd7daf7c699444a8bfea0bb4dcf963a1-mv2.jpg',
    '2HME5hUXxDGx/c14e39aab8/b942a5_bab687bfd14446ed854f19e1550eb266-mv2.jpg',
    '_I7jTQ-C-Dh5/b09aa1a0f5/b942a5_830ab138aef84b82b3db7b48185ee50c-mv2.jpg',
    'kutyfJpoJ-DA/ca1aa390f9/b942a5_71048e5af78a49e4b6e412bee89631e2-mv2.jpg',
    'NCtufeu82GJy/0cb53c797a/b942a5_ebec2dc631bf4872aeb94a01c0f12dd7-mv2.jpg',
    'fQuTnvGZbJAa/86ed3161c6/b942a5_5d0c26e331114666b05aeb4fca8cd3f1-mv2.jpg',
    'ds4-88xZCxr-/8317b998ec/b942a5_b9aafc7b5d0040e4819b526de9f4c1e2-mv2.jpg',
    'vdAI8reODuzV/51cc01057b/b942a5_27cb35500f7b4c53b3e379324de49ba7-mv2.jpg',
    '3brH1qwkxHa9/5f4c527879/b942a5_4b29b9e240d145ce8673732fa58dc7ec-mv2.jpg',
  ],
  'korean-teacup-poodle-female': [
    'GcThnLZ1o_XO/f28ac11602/b942a5_e172674fef9e426eaff0e73a7e4eba77-mv2.jpg',
    '-GPU8k3WeJq7/59ae864abe/b942a5_677a4998fefe4388b8c5f79d74129b88-mv2.jpg',
    '9v0TRGsxL1vp/43b2f58f58/b942a5_e17e745414544ea1b578880ea1bf535b-mv2.jpg',
  ],
  'maltipoo-cavapoo-male': ['jeaf0UcmFDSq/17b98c71ac/b942a5_244840afa15e4b008149736d5b894256-mv2.jpg'],
  'maltipoo-female-2': [
    's4vjs4fDhIH5/13bc63e2d9/b942a5_814fc9ca21e943149ca1b73af08c0d50-mv2.jpg',
    'P339nL9SBx1E/68f8b9aa08/b942a5_f4f6b9eaf3fa434d84e9011b104a2f2e-mv2.jpg',
    'Bba5vIUEEoRl/b9cb795228/b942a5_2cea5a50b30b4e6d81ef2b71a4455d04-mv2.jpg',
  ],
  'pomeranian-female': [
    '-kKg81ORXQbR/2df3e9d7fe/b942a5_04ffe4a8ebf2404fad62b654f5ffdf44-mv2.jpg',
    'tWfepr0dPXso/6b8445f11e/b942a5_87c1bf878b9642b0abde73d40a4a672d-mv2.jpg',
  ],
  'copper-male': [
    '57IVFGZFRSJ1/70ec15d562/b942a5_2c13cdda0a174e33b22cf65063e1aa7f-mv2.jpg',
    '2stMgxztsgXb/8b643b4842/b942a5_ce135cde6ebe45abb75435a7ce7d6910-mv2.jpg',
    'objS5G36nXH0/4d398662f6/b942a5_f29547489be747e597ed20c191e1f24c-mv2.jpg',
  ],
  'shitzu-female': ['IiEprGOhv7PA/bc83339b6d/b942a5_c5497befad4d4a70937e669e6c67bbb2-mv2.jpeg'],
  'shitzu-male': ['nGRgg9NQ0H_U/cb555fde1b/b942a5_38d832caea1148af824ab378c45ea865-mv2.jpg'],
  'maltipoo-female-1': [
    'Zsg0P8hWNXeY/888a9659ac/b942a5_1e2a534b212641c183efa8df90969da0-mv2.jpg',
    'hvIVlpipXnjZ/7c954810e6/b942a5_9537342069974565827ab8ade1a52636-mv2.jpg',
    'YhnrBy6ZwWks/1d241d42bc/b942a5_36c70cdc162d4d308ce2293077961c07-mv2.jpg',
  ],
  'maltipoo-female': [
    '_NpYIcbNGQC0/0dfcc90259/b942a5_34efe8b4c5c244fca7bb059e5b08891e-mv2.jpg',
    'l--XKCkJac6g/9e60957bb7/b942a5_6b2183f855cc4881933923f255131b51-mv2.jpg',
    'N1XdMhMnfw-A/6ba6cbb4d2/b942a5_d7eb4c4b58174a26976134a7db05da78-mv2.jpg',
  ],
  'korean-teacup-pomeranian-1': ['NCYZMBazXOyI/a67f6a1316/b942a5_4439600d2b084918be65f14abbd5a67b-mv2.jpg'],
  'korean-teacup-pomeranian': ['us2RC0-t56MV/755ebb01c3/b942a5_ea69dc41b8bc4f46b52ce710bdbfd947-mv2.jpg'],
  'korean-teacup-pomeranian-male': [
    'vxOcjPUQjM2M/768e4b20eb/b942a5_86735dc871b942c8b823521cf5fcf31e-mv2.jpg',
    'U_Qh2K9avqUE/3e9d7625dc/b942a5_f47099133ac14a69b1b1151c8f977a9a-mv2.jpg',
    'b29CnSlKSaNP/f3fd8ae60a/b942a5_287558eefc7e4386ad0c30344e6c4c62-mv2.jpg',
  ],
};
const videos = {
  'maltipoo-max-male': ['RH7J577OfQ7f/e776d07dbd/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67f000.jpg','jNYYlZcF2IuE/61af7a5e09/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67.mp4'],
  'korean-teacup-maltipoo-female': ['VEmjKw7D8k2w/44fc2c4d8f/b942a5_fc2a6555d51b4e65b8ad229592c3755bf002.jpg','sfXWPM3b8qVt/5b2a08dab3/b942a5_fc2a6555d51b4e65b8ad229592c3755b.mp4'],
  'maltipoo-cavapoo-male': ['czRyKKk8Lm5N/6356959786/b942a5_93358f1b7c434434b226b19e9ee0705bf002.jpg','_cJaO-ryO6ev/af9e004679/b942a5_93358f1b7c434434b226b19e9ee0705b.mp4'],
  'maltipoo-female-2': ['e9Tc1KFwflMo/bf15ff5eaf/b942a5_867cc819aad8444bbdc7ef58bccc22e3f000.jpg','Q6DRbgSnEgtV/f069a77a72/b942a5_867cc819aad8444bbdc7ef58bccc22e3.mp4'],
};
function puppy(slug, name, breed, gender, age, cover, local, archived) {
  const gallery = [cover, ...(extraPhotos[slug] || [])].map(image => ({image}));
  if (videos[slug]) gallery.push({image: videos[slug][0], video: videos[slug][1]});
  return {slug, name: name || breed, breed, gender, age, cover, gallery, local: Boolean(local), archived, href: '/puppies/' + slug + '/'};
}
export const available = availableRows.map(row => puppy(...row, false, false));
export const archive = archiveRows.map(([slug, name, breed, gender, cover, local]) =>
  puppy(slug, name, breed, gender, '3 months', cover, local, true)
);

export const questions = [
  ['Are your puppies vaccinated and health-checked?', 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.'],
  ['Can I meet a puppy before I decide?', 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.'],
  ['Can I take my puppy home the same day?', 'Local puppies are available immediately, so you can take your puppy home the same day.'],
  ['Do you import puppies from abroad?', 'Yes. We work with trusted international breeders and can arrange to bring miniature and Korean teacup breeds to Dubai.'],
  ['How does an imported puppy travel to Dubai?', 'Our team coordinates the paperwork, veterinary checks and comfortable travel through international cargo partners.'],
  ['Will I see photos and health details first?', 'Yes. We share photos, available videos and relevant health documents before you make a decision.'],
  ['Do you deliver?', 'We offer delivery within Dubai, and can help arrange worldwide shipping through our international cargo partners.'],
  ['Which breeds do you usually have?', 'Our listings may include Maltipoos, Cavapoos, Poodles, Pomeranians and Shih Tzus. See the catalog for current availability.'],
  ['Is there help after my puppy comes home?', 'Yes. Reach out for guidance and care questions after your puppy arrives.'],
];

export const localSteps = [
  ['Explore our puppies', 'Browse photos, breed details, age and health information in the catalog.'],
  ['Choose your puppy', 'Open a puppy’s profile and contact us if you have questions.'],
  ['Meet before you choose', 'Spend time bonding before making your decision.'],
  ['Pick-up or delivery', 'Collect your puppy in person or arrange a delivery within Dubai.'],
];
export const importSteps = [
  ['Reserve your puppy', 'Tell us which puppy has captured your heart.'],
  ['Personalized consultation', 'We finalize details with you and share updates on your puppy’s journey.'],
  ['Import and arrival', 'We manage health checks, travel arrangements, and documentation.'],
  ['Welcome home', 'We help your new puppy settle in and make the transition to your home.'],
];
