import React, { Component, createContext } from "react";
import { businessAPI, transactionAPI, stockAPI } from "../services/api";

export const BusinessContext = createContext(null);

class BusinessProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: null,
      todaySummary: null,
      transactions: [],
      stockItems: [],
      loading: true,
      error: null,
      lastUpdated: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const businessId = import.meta.env.VITE_BUSINESS_ID;

      if (!businessId) {
        throw new Error("No business ID configured in .env");
      }

      // Fetch all data in parallel
      const [summary, transactions, stock] = await Promise.all([
        transactionAPI.getTodaySummary(businessId),
        transactionAPI.getAll(businessId),
        stockAPI.getLevels(businessId),
      ]);

      this.setState({
        todaySummary: summary,
        transactions: transactions.transactions || [],
        stockItems: stock.stock_items || [],
        loading: false,
        lastUpdated: new Date(),
      });

    } catch (error) {
      console.error("[BusinessContext] Failed to load data:", error);
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  render() {
    return (
      <BusinessContext.Provider
        value={{
          ...this.state,
          refresh: this.loadData,
        }}
      >
        {this.props.children}
      </BusinessContext.Provider>
    );
  }
}

export default BusinessProvider;