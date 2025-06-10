import "./UserStatement.scss";

type UserStatementProps = {
    statement: string,
}

export default function UserStatement({statement}: UserStatementProps) {
    return (
        <p className="user-statement quote-lg">"{statement}"</p>
    );
}