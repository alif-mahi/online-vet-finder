import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Context/constant";

interface Appointment {
  _id: string;
  vet_id: {
    _id: string;
    name: string; // Name of the vet (populated field)
  };
  serviceId: {
    _id: string;
    name: string; // Name of the service (populated field)
    cost: number; // Cost of the service (populated field)
  };
  createdAt: Date; // Creation date of the appointment
}

export default function AppointmentHistory() {
  const user_id = localStorage.getItem("user_id");
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  async function fetchAppointments() {
    const response = await fetch(`${BASE_URL}/api/appointments/${user_id}`);
    const data = await response.json();
    if (response.ok) {
      setAppointments(data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Appointment History
        </h1>

        {appointments ? (
          <div>
            {appointments.length > 0 ? (
              <ul className="space-y-6">
                {appointments.map((appointment) => (
                  <li
                    key={appointment._id}
                    className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-blue-700">
                        Service: {appointment.serviceId.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Vet:</span>{" "}
                        {appointment.vet_id.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Price:</span> $
                        {appointment.serviceId.cost}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(appointment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No appointments found.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
