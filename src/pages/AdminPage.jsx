import {
    useMemo,
    useState,
} from "react";

import { Link } from "react-router-dom";

import Brand from "../components/Brand";

import {
    appointmentStatuses,
    professionals,
    services,
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

function AdminPage({
                       appointments,
                       onStatusChange,
                       onResetDemo,
                   }) {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("Todos");

    const filteredAppointments = useMemo(() => {
        const normalizedQuery = query
            .trim()
            .toLowerCase();

        return appointments
            .filter((appointment) => {
                return (
                    statusFilter === "Todos" ||
                    appointment.status === statusFilter
                );
            })
            .filter((appointment) => {
                if (!normalizedQuery) {
                    return true;
                }

                const searchableContent = [
                    appointment.clientName,
                    appointment.code,
                    appointment.phone,
                    appointment.email,
                ]
                    .join(" ")
                    .toLowerCase();

                return searchableContent.includes(
                    normalizedQuery
                );
            })
            .sort((firstAppointment, secondAppointment) => {
                const firstDate = `${firstAppointment.date}-${firstAppointment.time}`;
                const secondDate = `${secondAppointment.date}-${secondAppointment.time}`;

                return firstDate.localeCompare(secondDate);
            });
    }, [
        appointments,
        query,
        statusFilter,
    ]);

    const activeAppointments = appointments.filter(
        (appointment) =>
            ![
                "Cancelado",
                "Não compareceu",
            ].includes(appointment.status)
    );

    const todayAppointments = activeAppointments.filter(
        (appointment) =>
            appointment.date === getTodayISO()
    );

    const confirmedAppointments =
        appointments.filter(
            (appointment) =>
                appointment.status === "Confirmado"
        ).length;

    const estimatedRevenue =
        activeAppointments.reduce(
            (total, appointment) => {
                const service = services.find(
                    (serviceItem) =>
                        serviceItem.id ===
                        appointment.serviceId
                );

                return total + (service?.price ?? 0);
            },
            0
        );

    const registeredClients = new Set(
        appointments.map(
            (appointment) => appointment.phone
        )
    ).size;

    const occupancyPercentage = Math.min(
        100,
        Math.round(
            (todayAppointments.length / 8) * 100
        )
    );

    return (
        <div className="admin-shell">
            <aside className="sidebar">
                <Link to="/">
                    <Brand />
                </Link>

                <nav>
                    <a
                        className="active"
                        href="#dashboard"
                    >
                        ◫ Visão geral
                    </a>

                    <a href="#agenda">
                        ◷ Agenda
                    </a>

                    <a href="#clientes">
                        ◎ Clientes
                    </a>

                    <a href="#servicos">
                        ✦ Procedimentos
                    </a>

                    <a href="#equipe">
                        ♙ Profissionais
                    </a>
                </nav>

                <div className="sidebar-footer">
          <span>
            Ambiente demonstrativo
          </span>

                    <Link to="/">
                        ← Voltar ao site
                    </Link>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-top">
                    <div>
            <span className="eyebrow">
              Painel administrativo
            </span>

                        <h1>
                            Bom dia, equipe Luméra.
                        </h1>

                        <p>
                            Acompanhe agenda, clientes e indicadores da operação.
                        </p>
                    </div>

                    <div className="admin-user">
                        <span>LM</span>

                        <div>
                            <strong>Larissa Mendes</strong>
                            <small>Administradora</small>
                        </div>
                    </div>
                </header>

                <section
                    className="metrics"
                    id="dashboard"
                >
                    <article>
                        <span>◷</span>

                        <div>
                            <small>
                                Atendimentos hoje
                            </small>

                            <strong>
                                {todayAppointments.length}
                            </strong>

                            <p>
                                {occupancyPercentage}% da agenda ocupada
                            </p>
                        </div>
                    </article>

                    <article>
                        <span>✓</span>

                        <div>
                            <small>
                                Confirmados
                            </small>

                            <strong>
                                {confirmedAppointments}
                            </strong>

                            <p>
                                em toda a agenda
                            </p>
                        </div>
                    </article>

                    <article>
                        <span>R$</span>

                        <div>
                            <small>
                                Receita estimada
                            </small>

                            <strong>
                                {currency.format(
                                    estimatedRevenue
                                )}
                            </strong>

                            <p>
                                agendamentos ativos
                            </p>
                        </div>
                    </article>

                    <article>
                        <span>◎</span>

                        <div>
                            <small>
                                Clientes registrados
                            </small>

                            <strong>
                                {registeredClients}
                            </strong>

                            <p>
                                base demonstrativa
                            </p>
                        </div>
                    </article>
                </section>

                <section
                    className="admin-panel"
                    id="agenda"
                >
                    <div className="panel-head">
                        <div>
              <span className="eyebrow">
                Agenda
              </span>

                            <h2>
                                Atendimentos
                            </h2>
                        </div>

                        <div className="panel-actions">
                            <button
                                className="button button-outline"
                                type="button"
                                onClick={onResetDemo}
                            >
                                Restaurar demo
                            </button>

                            <Link
                                className="button button-primary"
                                to="/agendar"
                            >
                                Novo agendamento
                            </Link>
                        </div>
                    </div>

                    <div className="filters">
                        <input
                            value={query}
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            placeholder="Buscar cliente, telefone ou código..."
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="Todos">
                                Todos
                            </option>

                            {appointmentStatuses.map(
                                (status) => (
                                    <option
                                        key={status}
                                        value={status}
                                    >
                                        {status}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="table-wrap">
                        <table>
                            <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Procedimento</th>
                                <th>Profissional</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                            </thead>

                            <tbody>
                            {filteredAppointments.map(
                                (appointment) => {
                                    const service = services.find(
                                        (serviceItem) =>
                                            serviceItem.id ===
                                            appointment.serviceId
                                    );

                                    const professional =
                                        professionals.find(
                                            (professionalItem) =>
                                                professionalItem.id ===
                                                appointment.professionalId
                                        );

                                    return (
                                        <tr key={appointment.code}>
                                            <td>
                                                <strong>
                                                    {appointment.clientName}
                                                </strong>

                                                <small>
                                                    {appointment.code} ·{" "}
                                                    {appointment.phone}
                                                </small>
                                            </td>

                                            <td>
                                                <strong>
                                                    {service?.name ??
                                                        "Procedimento"}
                                                </strong>

                                                <small>
                                                    {service?.duration ?? 0} min
                                                </small>
                                            </td>

                                            <td>
                                                <strong>
                                                    {professional?.name ??
                                                        "Profissional"}
                                                </strong>

                                                <small>
                                                    {professional?.role}
                                                </small>
                                            </td>

                                            <td>
                                                <strong>
                                                    {formatDate(
                                                        appointment.date
                                                    )}
                                                </strong>

                                                <small>
                                                    {appointment.time}
                                                </small>
                                            </td>

                                            <td>
                                                <select
                                                    className="status"
                                                    value={appointment.status}
                                                    onChange={(event) =>
                                                        onStatusChange(
                                                            appointment.code,
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    {appointmentStatuses.map(
                                                        (status) => (
                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                            </tbody>
                        </table>

                        {filteredAppointments.length === 0 && (
                            <div className="empty">
                                Nenhum agendamento encontrado.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminPage;