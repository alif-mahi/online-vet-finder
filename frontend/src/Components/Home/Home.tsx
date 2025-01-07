import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-6"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <header className="text-center py-10">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            Find Your Perfect Vet
          </h1>
          <p className="text-xl text-gray-700">
            Connecting pet owners with trusted veterinarians in your area.
          </p>
        </header>

        {/* Featured Vets Section */}
        <section className="my-12">
          <h2 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            Featured Vets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((vet) => (
              <div
                key={vet}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <img
                  src="../../public/doc3.png"
                  alt={`Vet ${vet}`}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold mt-4 text-blue-800">
                  Dr. Jane Smith
                </h3>
                <p className="text-gray-600 mt-2">Specialization: Surgery</p>
                <p className="text-gray-600">Location: New York, NY</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="my-12">
          <h2 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Routine Check-ups",
              "Vaccinations",
              "Emergency Care",
              "Dental Services",
              "Pet Surgery",
              "Nutrition Counseling",
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center"
              >
                <p className="text-xl font-semibold text-blue-800">{service}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="my-12">
          <h2 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            Testimonials
          </h2>
          <div className="space-y-6">
            {[
              {
                quote:
                  "I found the best vet for my dog through this site! The process was easy and the vet was amazing!",
                author: "Sarah K.",
              },
              {
                quote:
                  "Highly recommend! The vet was very caring and knowledgeable.",
                author: "Mike L.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <p className="text-gray-700 italic text-lg">
                  "{testimonial.quote}"
                </p>
                <p className="text-right text-gray-800 font-bold mt-4">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center my-12">
          <h2 className="text-4xl font-semibold text-blue-700 mb-6">
            Get Started Today!
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Sign up now to find the best veterinarians near you and ensure your
            pet's health and happiness.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 text-white text-xl py-3 px-8 rounded-lg hover:bg-blue-800 transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </section>
      </div>
    </div>
  );
}
