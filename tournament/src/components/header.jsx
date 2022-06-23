import doWeHaveToken from "./checkIfAutorized";

export default function Header() {
  if (doWeHaveToken()) {
    return (
      <div className="autorizationNavElemes">
        <a className="Logo" href="/">
          <img
            src="https://thumb.tildacdn.com/tild3864-6334-4461-b934-313861376333/-/resize/200x/-/format/webp/image.png"
            alt="SingLogo"
          />
        </a>
        <div className="headerUserNav">
          <a href="/profile" className="profileHeader">
            Profile
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="autorizationNavElemes">
      <a className="Logo" href="/">
        <img
          src="https://thumb.tildacdn.com/tild3864-6334-4461-b934-313861376333/-/resize/200x/-/format/webp/image.png"
          alt="SingLogo"
        />
      </a>
      <div className="headerUserNav">
        <a href="/login" className="Login">
          Login
        </a>
        <a href="/registration" className="SignUp">
          Sign up
        </a>
      </div>
    </div>
  );
}
