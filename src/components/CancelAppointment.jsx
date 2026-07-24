import { useState } from "react";

function CancelAppointment({ onCancel }) {
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const cancellationSucceeded = onCancel(code, phone);

        if (cancellationSucceeded) {
            setMessage(
                "Agendamento cancelado com sucesso."
            );

            setMessageType("success");
            setCode("");
            setPhone("");

            return;
        }

        setMessage(
            "Não encontramos um agendamento ativo com esses dados."
        );

        setMessageType("error");
    }

    return (
        <form
            className="cancel-card"
            onSubmit={handleSubmit}
        >
            <div>
        <span className="eyebrow">
          Já possui horário?
        </span>

                <h3>
                    Consulte ou cancele seu agendamento
                </h3>

                <p>
                    Informe o código recebido na confirmação e o telefone utilizado no
                    cadastro.
                </p>
            </div>

            <label htmlFor="appointment-code">
                Código do agendamento

                <input
                    id="appointment-code"
                    type="text"
                    value={code}
                    onChange={(event) => {
                        setCode(event.target.value);
                        setMessage("");
                    }}
                    placeholder="LUM-000000"
                    autoComplete="off"
                    required
                />
            </label>

            <label htmlFor="appointment-phone">
                Telefone

                <input
                    id="appointment-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value);
                        setMessage("");
                    }}
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    required
                />
            </label>

            <button
                className="button button-primary"
                type="submit"
            >
                Cancelar agendamento
            </button>

            {message && (
                <p
                    className={`form-message ${messageType}`}
                    role="status"
                >
                    {message}
                </p>
            )}
        </form>
    );
}

export default CancelAppointment;