import {
    useMemo,
    useState,
} from "react";

import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

import {
    professionals,
    services,
    timeSlots,
} from "../data/clinic";

const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function getTodayISO() {
    return new Date().toISOString().split("T")[0];
}

function formatDate(date) {
    return new Date(`${date}T12:00:00`).toLocaleDateString(
        "pt-BR"
    );
}

function formatSpecialties(specialties) {
    if (Array.isArray(specialties)) {
        return specialties.join(" • ");
    }

    return specialties;
}

function BookingPage({
                         appointments,
                         onCreate,
                     }) {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        serviceId: "",
        professionalId: "",
        date: "",
        time: "",
        clientName: "",
        phone: "",
        email: "",
        notes: "",
    });

    const [confirmedAppointment, setConfirmedAppointment] =
        useState(null);

    function changeField(field, value) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    const selectedService = services.find(
        (service) => service.id === form.serviceId
    );

    const selectedProfessional = professionals.find(
        (professional) =>
            professional.id === form.professionalId
    );

    const availableTimes = useMemo(() => {
        return timeSlots.filter((timeSlot) => {
            const timeIsOccupied = appointments.some(
                (appointment) =>
                    appointment.date === form.date &&
                    appointment.professionalId ===
                    form.professionalId &&
                    appointment.time === timeSlot &&
                    ![
                        "Cancelado",
                        "Não compareceu",
                    ].includes(appointment.status)
            );

            return !timeIsOccupied;
        });
    }, [
        appointments,
        form.date,
        form.professionalId,
    ]);

    const canContinue =
        (step === 1 && Boolean(form.serviceId)) ||
        (step === 2 && Boolean(form.professionalId)) ||
        (step === 3 &&
            Boolean(form.date) &&
            Boolean(form.time));

    function handleSubmit(event) {
        event.preventDefault();

        const newAppointment = onCreate(form);

        setConfirmedAppointment(newAppointment);
    }

    if (confirmedAppointment) {
        return (
            <>
                <Header />

                <main className="booking-page">
                    <section className="shell confirmation">
            <span className="check">
              ✓
            </span>

                        <span className="eyebrow">
              Solicitação recebida
            </span>

                        <h1>
                            Seu agendamento foi registrado.
                        </h1>

                        <p>
                            Nesta versão demonstrativa, a solicitação já aparece no painel
                            administrativo.
                        </p>

                        <div className="code-box">
              <span>
                Código do agendamento
              </span>

                            <strong>
                                {confirmedAppointment.code}
                            </strong>
                        </div>

                        <div className="summary-grid">
                            <div>
                                <span>Tratamento</span>
                                <strong>{selectedService?.name}</strong>
                            </div>

                            <div>
                                <span>Especialista</span>
                                <strong>{selectedProfessional?.name}</strong>
                            </div>

                            <div>
                                <span>Data e horário</span>

                                <strong>
                                    {formatDate(form.date)} às {form.time}
                                </strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>Pendente</strong>
                            </div>
                        </div>

                        <div className="actions">
                            <Link
                                className="button button-primary"
                                to="/"
                            >
                                Voltar ao site
                            </Link>

                            <Link
                                className="button button-outline"
                                to="/admin"
                            >
                                Ver no painel demo
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="booking-page">
                <section className="shell">
                    <div className="booking-header">
            <span className="eyebrow">
              Agendamento online
            </span>

                        <h1>
                            Reserve sua avaliação em poucos passos.
                        </h1>

                        <p>
                            Escolha o tratamento e encontre um horário que se encaixe na sua
                            rotina.
                        </p>
                    </div>

                    <div className="stepper">
                        {[
                            "Tratamento",
                            "Especialista",
                            "Horário",
                            "Seus dados",
                        ].map((label, index) => (
                            <div
                                className={
                                    step >= index + 1
                                        ? "step active"
                                        : "step"
                                }
                                key={label}
                            >
                                <span>{index + 1}</span>
                                <strong>{label}</strong>
                            </div>
                        ))}
                    </div>

                    <form
                        className="booking-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="booking-step">
                            {step === 1 && (
                                <>
                                    <div className="step-heading">
                                        <h2>
                                            Qual tratamento você procura?
                                        </h2>

                                        <p>
                                            Você poderá ajustar o plano durante a avaliação.
                                        </p>
                                    </div>

                                    <div className="selection-grid">
                                        {services.map((service) => (
                                            <label
                                                className={
                                                    form.serviceId === service.id
                                                        ? "selection-card selected"
                                                        : "selection-card"
                                                }
                                                key={service.id}
                                            >
                                                <input
                                                    type="radio"
                                                    name="service"
                                                    checked={
                                                        form.serviceId === service.id
                                                    }
                                                    onChange={() =>
                                                        changeField(
                                                            "serviceId",
                                                            service.id
                                                        )
                                                    }
                                                />

                                                <div
                                                    className="selection-image"
                                                    style={{
                                                        backgroundImage: `url("${service.image}")`,
                                                    }}
                                                />

                                                <div>
                                                    <span>{service.category}</span>
                                                    <h3>{service.name}</h3>
                                                    <p>{service.description}</p>

                                                    <div className="selection-meta">
                            <span>
                              {service.duration} min
                            </span>

                                                        <strong>
                                                            {currency.format(
                                                                service.price
                                                            )}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="step-heading">
                                        <h2>
                                            Escolha a especialista.
                                        </h2>

                                        <p>
                                            O sistema poderia filtrar profissionais conforme cada
                                            procedimento.
                                        </p>
                                    </div>

                                    <div className="professional-list">
                                        {professionals.map(
                                            (professional) => (
                                                <label
                                                    className={
                                                        form.professionalId ===
                                                        professional.id
                                                            ? "professional-option selected"
                                                            : "professional-option"
                                                    }
                                                    key={professional.id}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="professional"
                                                        checked={
                                                            form.professionalId ===
                                                            professional.id
                                                        }
                                                        onChange={() =>
                                                            changeField(
                                                                "professionalId",
                                                                professional.id
                                                            )
                                                        }
                                                    />

                                                    <div
                                                        className="professional-photo"
                                                        style={{
                                                            backgroundImage: `url("${professional.image}")`,
                                                        }}
                                                    />

                                                    <div>
                                                        <h3>{professional.name}</h3>
                                                        <p>{professional.role}</p>

                                                        <span>
                              {formatSpecialties(
                                  professional.specialties
                              )}
                            </span>
                                                    </div>

                                                    <b>✓</b>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="step-heading">
                                        <h2>
                                            Escolha data e horário.
                                        </h2>

                                        <p>
                                            Horários ocupados para a especialista selecionada são
                                            removidos automaticamente.
                                        </p>
                                    </div>

                                    <div className="schedule-grid">
                                        <label>
                                            Data

                                            <input
                                                type="date"
                                                min={getTodayISO()}
                                                value={form.date}
                                                onChange={(event) =>
                                                    setForm((currentForm) => ({
                                                        ...currentForm,
                                                        date: event.target.value,
                                                        time: "",
                                                    }))
                                                }
                                                required
                                            />
                                        </label>

                                        <div>
                                            <label>
                                                Horários disponíveis
                                            </label>

                                            <div className="time-grid">
                                                {availableTimes.map(
                                                    (timeSlot) => (
                                                        <button
                                                            className={
                                                                form.time === timeSlot
                                                                    ? "selected"
                                                                    : ""
                                                            }
                                                            type="button"
                                                            key={timeSlot}
                                                            onClick={() =>
                                                                changeField(
                                                                    "time",
                                                                    timeSlot
                                                                )
                                                            }
                                                        >
                                                            {timeSlot}
                                                        </button>
                                                    )
                                                )}
                                            </div>

                                            {form.date &&
                                                availableTimes.length === 0 && (
                                                    <p className="form-message">
                                                        Não há horários disponíveis para esta data.
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <>
                                    <div className="step-heading">
                                        <h2>
                                            Informe seus dados.
                                        </h2>

                                        <p>
                                            A clínica usaria estas informações para confirmação e
                                            orientações prévias.
                                        </p>
                                    </div>

                                    <div className="client-grid">
                                        <label>
                                            Nome completo

                                            <input
                                                value={form.clientName}
                                                onChange={(event) =>
                                                    changeField(
                                                        "clientName",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </label>

                                        <label>
                                            Telefone

                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(event) =>
                                                    changeField(
                                                        "phone",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="(11) 99999-9999"
                                                required
                                            />
                                        </label>

                                        <label>
                                            E-mail

                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(event) =>
                                                    changeField(
                                                        "email",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </label>

                                        <label className="full">
                                            Observações

                                            <textarea
                                                rows="4"
                                                value={form.notes}
                                                onChange={(event) =>
                                                    changeField(
                                                        "notes",
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>

                                    <div className="summary-grid">
                                        <div>
                                            <span>Tratamento</span>
                                            <strong>{selectedService?.name}</strong>
                                        </div>

                                        <div>
                                            <span>Especialista</span>
                                            <strong>{selectedProfessional?.name}</strong>
                                        </div>

                                        <div>
                                            <span>Data</span>

                                            <strong>
                                                {form.date
                                                    ? formatDate(form.date)
                                                    : "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Horário</span>
                                            <strong>{form.time || "—"}</strong>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="booking-nav">
                            {step > 1 ? (
                                <button
                                    className="button button-outline"
                                    type="button"
                                    onClick={() =>
                                        setStep((currentStep) =>
                                            currentStep - 1
                                        )
                                    }
                                >
                                    Voltar
                                </button>
                            ) : (
                                <Link
                                    className="button button-outline"
                                    to="/"
                                >
                                    Cancelar
                                </Link>
                            )}

                            {step < 4 ? (
                                <button
                                    className="button button-primary"
                                    type="button"
                                    disabled={!canContinue}
                                    onClick={() =>
                                        setStep((currentStep) =>
                                            currentStep + 1
                                        )
                                    }
                                >
                                    Continuar
                                </button>
                            ) : (
                                <button
                                    className="button button-primary"
                                    type="submit"
                                    disabled={
                                        !form.clientName ||
                                        !form.phone ||
                                        !form.email
                                    }
                                >
                                    Confirmar agendamento
                                </button>
                            )}
                        </div>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default BookingPage;