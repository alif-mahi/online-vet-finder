export default function Contact() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-6"
      style={{ backgroundImage: "url('/contact.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <header className="text-center py-10">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            Emergency Contact Information
          </h1>
          <p className="text-xl text-gray-700">
            Keep this information handy for your pet's safety.
          </p>
        </header>

        {/* Emergency Vet Clinics Section */}
        <section className="my-12">
          <h2 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            Emergency Vet Clinics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "City Animal Hospital",
                phone: "(123) 456-7890",
                address: "123 Main St, Anytown, USA",
                hours: "24/7",
              },
              {
                name: "Emergency Pet Care",
                phone: "(987) 654-3210",
                address: "456 Elm St, Othertown, USA",
                hours: "24/7",
              },
              {
                name: "Paws & Claws Veterinary Clinic",
                phone: "(555) 123-4567",
                address: "789 Oak St, Sometown, USA",
                hours: "24/7",
              },
              {
                name: "Animal Emergency Center",
                phone: "(444) 987-6543",
                address: "321 Pine St, Anycity, USA",
                hours: "24/7",
              },
            ].map((clinic, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                  {clinic.name}
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span> {clinic.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Address:</span>{" "}
                  {clinic.address}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Hours:</span> {clinic.hours}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* General Emergency Advice Section */}
        <section className="my-12">
          <h2 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            General Emergency Advice
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-4 text-lg">
            {[
              "Stay calm and assess the situation.",
              "Contact your emergency vet clinic immediately.",
              "If your pet is injured, try to keep them still and avoid moving them unless necessary.",
              "Keep a first aid kit for pets at home, including bandages, antiseptic wipes, and any necessary medications.",
              "Know the signs of common emergencies, such as difficulty breathing, excessive bleeding, or seizures.",
              "Have a plan for transportation to the vet in case of an emergency.",
              "Always keep your vet's contact information readily available.",
            ].map((advice, index) => (
              <li key={index}>{advice}</li>
            ))}
          </ul>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center my-12">
          <h2 className="text-4xl font-semibold text-blue-700 mb-6">
            Be Prepared!
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Emergencies can happen at any time. Make sure you are prepared to
            act quickly and effectively.
          </p>
          <button className="bg-blue-700 text-white text-xl py-3 px-8 rounded-lg hover:bg-blue-800 transition duration-300 transform hover:scale-105">
            Learn More About Pet Care
          </button>
        </section>
      </div>
    </div>
  );
}
