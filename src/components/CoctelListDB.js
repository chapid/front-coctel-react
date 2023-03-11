import React,{useState, useEffect} from "react";

const CoctelListDB = () => {

    const [cocteles, setCocteles] = useState([])

    useEffect(()=>{
      const getCocteles = async() => {
        await fetch(`http://localhost:3001/coctel/`)
          .then(res => res.json())
          .then(res => setCocteles(res))
      }
      getCocteles()
    }, [])



    const handleSubmit = ev => {

        ev.preventDefault();
        let idprod = ev.target.value;

        fetch(`http://localhost:3001/coctel/${idprod}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

    }

    return (
        <form>
        <table className="table table-striped table-secondary table-hover mt-5 shadow-lg">
                <thead>
                    <tr>
                        <th>Coctel</th>
                        <th>Instrucciones</th>
                        <th>Categoria</th>
                        <th>Data glass</th>
                        <th>keys</th>
                        <th>Img</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {cocteles === null ? 
                    <tr>
                        <td colSpan={3}>No se encontraron resultados</td>
                    </tr> :
                    cocteles.map(coctel => (
                        <tr key={coctel.id_coctel}>
                            <td>{coctel.nombre_coctel}</td>
                            <td>{coctel.instr_coctel}</td>
                            <td>{coctel.categoria_coctel}</td>
                            <td>{coctel.data_coctel}</td>
                            <td>{coctel.keys_coctel}</td>
                            <td>
                            <div className="text-center">
                                <img src={coctel.img_coctel} className="rounded" style={{ width: '5rem' }}/>
                            </div>
                            </td>
                            <td>
                                <button type="submit" onClick={handleSubmit} className="btn btn-danger" value={coctel.id_coctel}>Borrar</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </form>
    )
}

export default CoctelListDB;