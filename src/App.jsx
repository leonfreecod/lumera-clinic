import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";

import { demoAppointments } from "./data/clinic";

const STORAGE_KEY = "lumera-appointments";

function loadAppointments() {
    try {
        const savedAppointments = localStorage.getItem(STORAGE_KEY);

        if (!savedAppointments) {
            return demoAppointments;
        }

        const parsedAppointments = JSON.parse(savedAppointments);

        if (!Array.isArray(parsedAppointments)) {
            return demoAppointments;
        }

        return parsedAppointments;
    } catch {
        return demoAppointments;
    }
}

function normalizePhone(phone) {
    return phone.replace(/\D/g, "");
}

function App() {
    const [appointments, setAppointments] = useState(loadAppointments);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(appointments)
        );
    }, [appointments]);

    function createAppointment(appointmentData) {
        const newAppointment = {
            ...appointmentData,
            code: `LUM-${String(Date.now()).slice(-6)}`,
            status: "Pendente",
            createdAt: new Date().toISOString(),
        };

        setAppointments((currentAppointments) => [
            newAppointment,
            ...currentAppointments,
        ]);

        return newAppointment;
    }

    function updateAppointmentStatus(code, newStatus) {
        setAppointments((currentAppointments) =>
            currentAppointments.map((appointment) =>
                appointment.code === code
                    ? {
                        ...appointment,
                        status: newStatus,
                    }
                    : appointment
            )
        );
    }

    function cancelAppointment(code, phone) {
        const normalizedCode = code.trim().toUpperCase();
        const normalizedPhone = normalizePhone(phone);

        const appointmentExists = appointments.some(
            (appointment) =>
                appointment.code.toUpperCase() === normalizedCode &&
                normalizePhone(appointment.phone) === normalizedPhone &&
                appointment.status !== "Concluído" &&
                appointment.status !== "Cancelado"
        );

        if (!appointmentExists) {
            return false;
        }

        setAppointments((currentAppointments) =>
            currentAppointments.map((appointment) => {
                const matchesAppointment =
                    appointment.code.toUpperCase() === normalizedCode &&
                    normalizePhone(appointment.phone) === normalizedPhone;

                if (!matchesAppointment) {
                    return appointment;
                }

                return {
                    ...appointment,
                    status: "Cancelado",
                };
            })
        );

        return true;
    }

    function resetDemoAppointments() {
        setAppointments(demoAppointments);
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <HomePage
                        onCancel={cancelAppointment}
                    />
                }
            />

            <Route
                path="/agendar"
                element={
                    <BookingPage
                        appointments={appointments}
                        onCreate={createAppointment}
                    />
                }
            />

            <Route
                path="/admin"
                element={
                    <AdminPage
                        appointments={appointments}
                        onStatusChange={updateAppointmentStatus}
                        onResetDemo={resetDemoAppointments}
                    />
                }
            />
        </Routes>
    );
}

export default App;