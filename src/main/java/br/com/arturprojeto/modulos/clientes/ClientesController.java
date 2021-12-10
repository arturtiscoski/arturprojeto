package br.com.arturprojeto.modulos.clientes;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.handler.ExceptionHandlingWebHandler;

import java.io.EOFException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ClientesController {

    @Autowired
    private ClienteRepositoryFinder clienteRepositoryFinder;

    @RequestMapping(value = "/cliente", method = RequestMethod.GET)
    public List<Cliente> getCliente(@RequestParam("id") String descricao) throws Exception {
        return clienteRepositoryFinder.buscaCliente(descricao);
    }

    @JsonView(Cliente.Lista.class)
    @RequestMapping(value = "/clientes/consulta", method = RequestMethod.GET)
    public List<Cliente> consultaCliente(@RequestParam("descricao") String descricao) throws Exception {
        return clienteRepositoryFinder.buscaCliente(descricao);
    }

    @RequestMapping(value = "/clientes", method = RequestMethod.POST)
    public List<String> salvaCliente(@RequestBody() Cliente cliente) throws Exception {
        List<String> result = new ArrayList<>();

        try {
            Cliente DBCli = clienteRepositoryFinder.findByCPFCNPJ(cliente.getCpfcnpj());
            
            if (DBCli != null) {
                throw new Exception("Cpf / cnpj ja cadastrado!");
            }

            if (cliente.getId() == 0) {
                cliente.setId(clienteRepositoryFinder.sequencial());
            }

            clienteRepositoryFinder.save(cliente);
            
            result.add("Sucesso");
            return result;
        } catch (Exception e) {
            result.add(e.toString());
            return result;
        }
    }

    @RequestMapping(value = "/cliente/excluir", method = RequestMethod.DELETE)
    public boolean excluirPrecliente(@RequestParam(value="id", defaultValue="0") Integer id) {
        Cliente cliente = clienteRepositoryFinder.findOne(id);
        clienteRepositoryFinder.delete(cliente);
        return true;
    }
}
