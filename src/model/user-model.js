import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

class User extends mongoose.Schema {
  constructor(user, email, password) {
    super({
      user: {
        type: String,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    });
    //Metodo para encryptar password con bcrytp
    this.methods.encryptPassword = async (Password) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(Password, salt);
    };
    //Metodo para comparar password ingresado con el password guardado en la base de datos
    this.methods.comparePassword = async function (password, passwordV) {
      return bcrypt.compare(password, passwordV);
    };
  }
}

export default mongoose.model('User', new User());
