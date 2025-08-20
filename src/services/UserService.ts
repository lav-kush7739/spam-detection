import UserRepository from "../repos/UserRepository.js";

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
        const id = await this.userRepository.userRegister(name,phone,password,email);
        return id;
  }
}
