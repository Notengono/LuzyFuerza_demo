import React from 'react'
import { Navbar } from '../components/ui/Navbar'
import { Switch, Route, Redirect } from 'react-router-dom'
// import { MarvelScreen } from '../components/marvel/MarvelScreen'
// import { HeroScreen } from '../components/heroes/HeroScreen'
// import { DcScreen } from '../components/dc/DcScreen'
import { SearchScreen } from '../search/SearchScreen'
import { AfiliadoScreen } from '../components/AfiliadoScreen'
import { AdherenteScreen } from '../components/afiliado/AdherenteScreen'
// import Menu from '../components/ui/menu'
// import UserMenu from '../components/ui/user_menu'

export const DashboardRoutes = () => {
    return (
        <>
            {/* <UserMenu /> */}
            {/* <Menu /> */}
            <Navbar />
            <div className="container mt-2">
                <Switch>
                    {/* <Route exact path="/marvel" component={MarvelScreen} />
                    <Route exact path="/hero/:heroeId" component={HeroScreen} /> */}
                    <Route exact path="/adherente/:id" component={AdherenteScreen} />
                    <Route exact path="/afiliado" component={AfiliadoScreen} />
                    <Route exact path="/search" component={SearchScreen} />
                    <Redirect to="/afiliado" />
                </Switch>
            </div>
        </>
    )
}
