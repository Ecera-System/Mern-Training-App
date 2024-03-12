import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header textColor="text-white" />
      <div className="bg-gray-100 py-10 px-4 md:px-16 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-800 mb-8">
            This Privacy Policy describes how Ecera Systems ("we", "us", or
            "our") collects, uses, and shares personal information of users of
            this website (the "Ecera System"). Please read this Privacy Policy
            carefully before using the Site.
          </p>
          <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
          <p className="text-gray-800 mb-8">
            We may collect personal information that you voluntarily provide to
            us when you visit the Site, such as your name, email address, and
            any other information you choose to provide.
          </p>
          <h2 className="text-2xl font-bold mb-2">
            How We Use Your Information
          </h2>
          <p className="text-gray-800 mb-8">
            We may use the information we collect from you to operate and
            improve our Site, to send you administrative and promotional emails,
            to respond to your comments or inquiries, and for any other purpose
            disclosed to you at the time we collect your information.
          </p>
          <h2 className="text-2xl font-bold mb-2">Information Sharing</h2>
          <p className="text-gray-800 mb-8">
            We do not sell, trade, or rent your personal information to others.
            We may share generic aggregated demographic information not linked
            to any personal identification information regarding visitors and
            users with our business partners, trusted affiliates, and
            advertisers.
          </p>
          <h2 className="text-2xl font-bold mb-2">Security</h2>
          <p className="text-gray-800 mb-8">
            We are committed to protecting the security of your personal
            information. We use a variety of security technologies and
            procedures to help protect your personal information from
            unauthorized access, use, or disclosure.
          </p>
          <h2 className="text-2xl font-bold mb-2">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-800 mb-8">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="text-gray-800 mb-8">
            If you have any questions about this Cookies Policy, please contact
            us at{" "}
            <a
              href="mailto:mernprogram@ecerasystem.com"
              className="text-blue-600 hover:underline"
            >
              mernprogram@ecerasystem.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
