import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-[20px] bg-white">
      <div className="container">
        <div className="relative">
          <Link to="#" className="link">
            English(UK)
          </Link>
          <Link to="#" className="link">
            Français(FR)
          </Link>
          <Link to="#" className="link">
            العربية
          </Link>
          <Link to="#" className="link">
            ⵜⴰⵎⴰⵣⵉⵖⵜ
          </Link>
          <Link to="#" className="link">
            Español (España)
          </Link>
          <Link to="#" className="link">
            italiano
          </Link>
          <Link to="#" className="link">
            Deutsch
          </Link>
          <Link to="#" className="link">
            Português (Brasil)
          </Link>
          <Link to="#" className="link">
            हिन्दी
          </Link>
          <Link to="#" className="link">
            中文(简体)
          </Link>
          <Link to="#" className="link">
            日本語
          </Link>
          <Link
            to="#"
            className="h[19px] w-[30px] inline-flex justify-center items-center bg-[#f5f6f7] border border-solid border-[(--bg-third)] ml-[10px] translate-y-[6px]"
          >
            <i className="plus_icon"></i>
          </Link>
        </div>
        <div className="spacer my-2"></div>
        <div className="">
          <Link to="#" className="link">
            Sign Up
          </Link>
          <Link to="#" className="link">
            Log in
          </Link>
          <Link to="#" className="link">
            Messenger
          </Link>
          <Link to="#" className="link">
            Facebook Lite
          </Link>
          <Link to="#" className="link">
            Watch
          </Link>
          <Link to="#" className="link">
            Places
          </Link>
          <Link to="#" className="link">
            Games
          </Link>
          <Link to="#" className="link">
            Marketplace
          </Link>
          <Link to="#" className="link">
            Facebook Pay
          </Link>
          <Link to="#" className="link">
            Oculus
          </Link>
          <Link to="#" className="link">
            Portal
          </Link>
          <Link to="#" className="link">
            Instagram
          </Link>
          <Link to="#" className="link">
            Bulletin
          </Link>
          <Link to="#" className="link">
            Local
          </Link>
          <Link to="#" className="link">
            Fundraisers
          </Link>
          <Link to="#" className="link">
            Services
          </Link>
          <Link to="#" className="link">
            Voting Information Centre
          </Link>
          <Link to="#" className="link">
            Groups
          </Link>
          <Link to="#" className="link">
            About
          </Link>
          <Link to="#" className="link">
            Create ad
          </Link>
          <Link to="#" className="link">
            Create Page
          </Link>
          <Link to="#" className="link">
            Developers
          </Link>
          <Link to="#" className="link">
            Careers
          </Link>
          <Link to="#" className="link">
            Privacy
          </Link>
          <Link to="#" className="link">
            Cookies
          </Link>
          <Link to="#" className="link">
            AdChoices
            <i className="adChoices_icon"></i>
          </Link>
          <Link to="#" className="link">
            Terms
          </Link>
          <Link to="#" className="link">
            Help
          </Link>
        </div>
        <div
          className="login_footer_wrap"
          style={{ fontSize: "12px", marginTop: "20px" }}
        >
          <span className="link">Meta © 2022</span>
        </div>
      </div>
    </footer>
  );
}
