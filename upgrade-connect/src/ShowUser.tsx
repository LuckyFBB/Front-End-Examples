import React from "react";
import { connect } from "./react-redux";
const mapStateToProps = (state: any) => {
    const { user } = state;
    return {
        name: user.userName
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateName: (count: number) =>
            dispatch({ type: "user/UPDATE_USER", data: { userName: `FBB-${count}` } })
    };
};
class ShowUser extends React.Component<any, any> {
    state = { count: 0 };
    handleUpdateName = () => {
        const { updateName } = this.props;
        const count = this.state.count + 1;
        updateName(count);
        this.setState({ count });
    };
    render() {
        const { name } = this.props;
        return <div onClick={this.handleUpdateName}>{name}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
