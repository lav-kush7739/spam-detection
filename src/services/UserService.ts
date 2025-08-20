import UserRepository from "../repos/UserRepository.js";
import BadRequest from "../errors/BadRequest.js";
export default class UserService {

  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async userRegister(
    name: string,
    phone: string,
    password: string,
    email?: string
  ) {
        const Exists = await this.userRepository.checkIfPhoneExists(phone);
        if(Exists){
                throw new BadRequest('Phone number already exists !')
        }
        else{
        const id = await this.userRepository.userRegister(name,phone,password,email);
        return id;
        }
  }
}
