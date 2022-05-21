import React from "react";
import { connect } from "./react-redux";

interface IProps {
    name: string;
    updateName: () => void
}

const mapStateToProps = (state: any) => {
    const { user } = state;
    return {
        name: user.userName
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateName: () =>
            dispatch({ type: "user/UPDATE_USER", data: { userName: "FBB" } })
    };
};
class ShowUser extends React.Component<any, IProps> {
    render() {
        const { name, updateName } = this.props;
        return <div onClick={updateName}>{name}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
