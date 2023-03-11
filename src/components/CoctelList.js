import React,{useState, useEffect} from "react";

const CoctelList = () => {

    const [cocteles, setCocteles] = useState([])
    const [findcoctel, findCocteles] = useState([])

    const handleSubmit = ev => {

        ev.preventDefault();
        let idprod = ev.target.value;
        
        let results = cocteles.filter((dato) => dato.idDrink === idprod);

        console.log("results",results);

        fetch('http://localhost:3001/coctel/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_coctel: `${results[0].idDrink}${Math.round(Math.random()*100)}`,
                nombre_coctel: results[0].strDrink,
                keys_coctel: `${results[0].strAlcoholic}, ${results[0].strIngredient1}, ${results[0].strIngredient2}, ${results[0].strIngredient3}`,
                instr_coctel: results[0].strInstructionsES === null ? 'Sin instrucciones' : results[0].strInstructionsES,
                data_coctel: results[0].strGlass,
                categoria_coctel: results[0].strCategory,
                img_coctel: results[0].strDrinkThumb
            })
        });

    }


    useEffect(()=>{
        const getCocteles = async() => {
          await fetch(`http://localhost:3001/apicoctel/${findcoctel}`)
            .then(res => res.json())
            .then(res => setCocteles(res))
        }
        getCocteles()
      }, [])

    const findValor = e =>{
        if(e.target.value){
            e.preventDefault()
            fetch(`http://localhost:3001/apicoctel/${e.target.value}`)
            .then(res => res.json())
            .then(res => setCocteles(res.drinks))
        }
        findCocteles(e.target.value)
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <input className="form-control" type="text" placeholder="buscar coctel" id="valor" onChange={findValor}/>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        <br/>
        <form>
        <table className="table table-striped table-hover mt-5 shadow-lg justify-content-center">
                <thead>
                    <tr>
                        <th className="justify-content-center">Cocteles</th>
                    </tr>
                </thead>
                <tbody className="justify-content-center">
                    {cocteles === null ? 
                    <tr>
                        <td colSpan={3}>No se encontraron resultados</td>
                    </tr> :
                    cocteles.map(coctel => (
                        <tr className="justify-content-center" key={coctel.idDrink} >
                            <td>
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={coctel.strDrinkThumb} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{coctel.strDrink}</h5>
                                        <p className="card-text">{coctel.strInstructionsES}</p>
                                        <p className="card-text"><b>Categoria:</b> {coctel.strCategory}</p>
                                        <p className="card-text"><small className="text-muted"><b>data: </b>{coctel.strGlass}</small></p>
                                        <p className="card-text"><small className="text-muted"><b>keys: </b>{coctel.strAlcoholic}, {coctel.strIngredient1}, {coctel.strIngredient2}, {coctel.strIngredient3}</small></p>
                                    </div>
                                    <button type="reset" onClick={handleSubmit} className="btn btn-primary" value={coctel.idDrink}>Guardar</button>
                                </div>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
            </form></>
    )
}

export default CoctelList;