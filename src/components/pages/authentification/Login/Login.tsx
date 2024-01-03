import React, { useState } from "react";
import "./Login.scss";
import { useAuthContext } from "../../../../contexts/AuthContext";
import InputText from "../../../atoms/InputText/InputText";
import Button from "../../../atoms/Button/Button";
import { useGoNavigate } from "../../../../hooks/Navigation";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successLogin, setSuccessLogin] = useState<false | true | null>(null);
  const { usersService } = useAuthContext();
  const { navigateTo } = useGoNavigate();


  const handleSubmit = async (e : any) => {
    e.preventDefault();

    let element = {
      "email": email,
      "password": password
    };

      const response = await usersService.login(element);
      
      if (response && response.token !== '' && response.token !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(response.token));
        setSuccessLogin(true);
        navigateTo(`/courses`);

      } else {
          console.log("Le Token Register est vide");
      }
  };

  return (
    <div className="form-login">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <h1> Connexion </h1>

        <div className="mb-3">

            <InputText 
                label= {"Email"}   
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                name="email"
                placeholder={"Adresse email"} 
                isRequired= {true}
                errorText={ false  ?  "L'email est invalide"  : ""}
            />
        </div>
        <div className="mb-3">
          <InputText 
              label= {"Mot de passe"}   
              value={password} 
              type="password"
              onChange={(e) => setPassword(e.target.value)} 
              placeholder={"Mot de passe"} 
              isRequired= {true}
              errorText={ false ? "Le mot de passe de vérification ne correspond pas" : ""}
          />
        </div>

        <div className="mb-3"> 
          <Button type="submit" kind={'primary'} stylesBtn="mb-3">
            Se connecter
          </Button>
        </div>

        {/* <p className="link-btn">
          Vous n'avez pas encore de compte ?
          <Link to="/register"> S'inscrire </Link>
        </p> */}
      </form>
      <div
        className={
          successLogin !== null && successLogin === false
            ? "form-arror-msg show"
            : "form-arror-msg hidden"
        }
      >
        <p>
          Votre Email et/ou Mot de passe sont incorrects.
          <br /> Veuillez recommencer.
        </p>
      </div>
    </div>
  );
};

export default Login;
