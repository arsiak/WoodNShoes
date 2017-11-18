const User = require('./models/User');
const Ad = require('./models/Ad');

const verification = User.find().where('email', 'john.doe@gmail.com').exec((err, docs) => {
  if (docs.length === 0){
    const user = new User({
      email: 'john.doe@gmail.com',
      password: 'test',

      profile: {
        name: 'John Doe',
        gender: 'Male',
        phone: '0612345678',
        location: '12 Rue de la Libération, Faulx, France',
      }
    });
    user.save();

    const ad1 = new Ad({
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id porta libero, vel venenatis massa. Suspendisse euismod dui a malesuada lacinia. Cras ac eros sit amet mi convallis laoreet sed at ex. Aliquam aliquet sed quam bibendum convallis. Nunc aliquet, nunc non maximus pharetra, velit eros porta lectus, id lobortis purus nisl a sem. Suspendisse scelerisque in orci id hendrerit. Aenean sit amet auctor orci. Etiam vitae auctor nisl. Ut sapien sapien, pharetra vitae risus in, convallis vulputate orci. Morbi a magna ullamcorper elit facilisis convallis. Maecenas eget imperdiet sapien. Nunc id ligula vel urna accumsan dictum in sed ante. Proin fermentum ullamcorper quam, non eleifend nisi facilisis vitae.',
      title: 'Brown Timberland size 45',
      shoes: {
        brand: 'Timberland',
        location: '2B Boulevard Charlemagne, Nancy, France',
        gender: 'Other',
        price: 14,
        size: 45,
        picture: '31588585779baff6d638b'
      },
      user: user._id,
      reserved: false
    });
    ad1.save();


    const ad2 = new Ad({
      description: 'Cras ac eros sit amet mi convallis laoreet sed at ex. Aliquam aliquet sed quam bibendum convallis. Nunc aliquet, nunc non maximus pharetra, velit eros porta lectus, id lobortis purus nisl a sem. Suspendisse scelerisque in orci id hendrerit. Aenean sit amet auctor orci. Etiam vitae auctor nisl. Ut sapien sapien, pharetra vitae risus in, convallis vulputate orci. Morbi a magna ullamcorper elit facilisis convallis. Maecenas eget imperdiet sapien. Nunc id ligula vel urna accumsan dictum in sed ante. Proin fermentum ullamcorper quam, non eleifend nisi facilisis vitae.',
      title: 'Black Pataugas size 47',
      shoes: {
        brand: 'Pataugas',
        location: 'Central Park, New York, NY, USA',
        gender: 'male',
        price: 22,
        size: 47,
        picture: '381daf1c3379c77b6e15638b3531bdd4'
      },
      user: user._id,
      reserved: false
    });
    ad2.save();

    const ad3 = new Ad({
      description: 'Morbi a magna ullamcorper elit facilisis convallis. Maecenas eget imperdiet sapien. Nunc id ligula vel urna accumsan dictum in sed ante. Proin fermentum ullamcorper quam, non eleifend nisi facilisis vitae.',
      title: 'Red Doc Martens size 38 for womens',
      shoes: {
        brand: 'Doc Martens',
        location: 'Central Park, New York, NY, USA',
        gender: 'female',
        price: 16,
        size: 38,
        picture: '280d2208f0308hdod9797'
      },
      user: user._id,
      reserved: true
    });
    ad3.save();
  }
});

