import { useState } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import GamePage from "./pages/GamePage";
import Offers from "./pages/Offers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/not-found";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header onCartOpen={() => setCartOpen(true)} />
      <main className="min-h-[calc(100vh-10rem)]">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/games" component={Games} />
          <Route path="/game/:gameType" component={GamePage} />
          <Route path="/offers" component={Offers} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toaster />
    </div>
  );
}
