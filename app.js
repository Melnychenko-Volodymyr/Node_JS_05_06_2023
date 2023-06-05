const mongoose = require('mongoose');
const UserModel = require('./models/user');

const connectToDatabase = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
  console.log('Підключено до бази даних');
};

const createCollection = async () => {
  await UserModel.create();
  console.log('Створено колекцію');
};

const createUser = async () => {
  const data = {
    name: 'Volodymyr',
    surname: 'Melnychenko',
    birthday: new Date('1968-11-07')
  };

  await UserModel.create(data);
  console.log('Створено та збережено користувача');
};

const insertMultipleUsers = async () => {
  const data = [
    {
      name: 'Larysa',
      surname: 'Betsko',
      birthday: new Date('1977-01-02')
    },
    {
      name: 'Daryna',
      surname: 'Melnychenko',
      birthday: new Date('2015-03-30')
    },
    {
      name: 'Lyudmyla',
      surname: 'Melnychenko',
      birthday: new Date('1942-02-05')
    }
  ];

  await UserModel.insertMany(data);
  console.log('Додано масив користувачів');
};

const getUsers = async () => {
    try {
      const users = await UserModel.find({});
      console.log('Усі користувачі:', users);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getUsersByCondition = async () => {
    try {
      const users = await UserModel.find({ name: 'Larysa' });
      console.log('Користувачі за умовою name: "Larysa":', users);
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateDocuments = async () => {
    try {
      const result = await UserModel.updateMany({ name: 'Larysa' }, { surname: 'Melnychenko' });
      console.log('Кількість змінених документів:', result.modifiedCount);
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteDocuments = async () => {
    try {
      const result = await UserModel.deleteMany({ name: 'Daryna' });
      console.log('Кількість видалених документів:', result.deletedCount);
    } catch (error) {
      console.error(error);
    }
  };
  

const run = async () => {
  try {
    await connectToDatabase();
    await createCollection();
    await createUser();
    await insertMultipleUsers();
    await getUsers();
    await getUsersByCondition();
    await updateDocuments();
    await deleteDocuments();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
    console.log('Відключено від бази даних');
  }
};

run();
