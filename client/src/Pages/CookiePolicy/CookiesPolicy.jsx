import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

const CookiesPolicy = () => {
  return (
    <div>
      <Header textColor="text-white" />
      <div className="bg-gray-100 py-10 px-4 md:px-16 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Cookies Policy
          </h1>
          <p className="text-gray-800 mb-8">
            This website uses cookies to enhance the user experience. By using
            our website, you consent to our use of cookies in accordance with
            this policy.
          </p>
          <h2 className="text-2xl font-bold mb-2">What are Cookies?</h2>
          <p className="text-gray-800 mb-8">
            Cookies are small text files that are stored on your computer or
            mobile device when you visit a website. They allow the website to
            recognize your device and remember information about your visit,
            such as your preferences and settings.
          </p>
          <h2 className="text-2xl font-bold mb-2">How We Use Cookies</h2>
          <p className="text-gray-800 mb-8">
            We use cookies for various purposes, including:
            <ul className="list-disc ml-8">
              <li>To provide a personalized experience for users</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To improve our website and services</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-2">Managing Cookies</h2>
          <p className="text-gray-800 mb-8">
            You can control and manage cookies in various ways, including:
            <ul className="list-disc ml-8">
              <li>Adjusting your browser settings to refuse cookies</li>
              <li>Deleting cookies from your browser</li>
              <li>Opting out of certain types of cookies</li>
            </ul>
            Please note that disabling or refusing cookies may impact your
            experience on our website and limit certain features and
            functionality.
          </p>
          <p className="text-gray-800 mb-8">
            By using our website, you consent to the use of cookies as described
            in this Cookies Policy.
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

export default CookiesPolicy;
