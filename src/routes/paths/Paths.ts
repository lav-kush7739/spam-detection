const Paths = {
  Base: "/api",
  Auth: {
    Base: "/v1/auth",
    register: "/register",
    login: "/login",
  },
  Spam: {
    Base: "/v1/spam",
    mark: "/mark",
    likelihood: "/likelihood/:phone",
  },
  Search: {
    Base: "/v1/search",
    phone: "/phone",
    name: "/name",
    person: "/person/:phone",
  },
};

export default Paths;
