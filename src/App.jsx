import React, { Component } from "react";
import {BusinessContext} from "./context/BusinessContext";  
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Stock from "./pages/Stock";

class App extends Component {
  static contentType = BusinessContext;
  constructor(props) {
    super(props);
    this.state = {
      activePath: "/",
      refreshKey: 0,
    };
  }

  handleNavigate = (path) => {
    this.setState({ activePath: path });
  };

  handleRefresh = () => {
    this.context?.refresh();
  };

  renderPage = () => {
    const { activePath, refreshKey } = this.state;
    switch (activePath) {
      case "/":
        return <Dashboard key={refreshKey} />;
      case "/transactions":
        return <Transactions key={refreshKey} />;
      case "/stock":
        return <Stock key={refreshKey} />;
      default:
        return <Dashboard key={refreshKey} />;
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout
          onNavigate={this.handleNavigate}
          onRefresh={this.handleRefresh}
          activePath={this.state.activePath}
        >
          {this.renderPage()}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;