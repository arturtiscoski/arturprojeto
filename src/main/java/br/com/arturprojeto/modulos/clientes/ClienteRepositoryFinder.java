package br.com.arturprojeto.modulos.clientes;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClienteRepositoryFinder extends CrudRepository<Cliente, Integer> {

  @JsonView(Cliente.Lista.class)
  @Query("from Cliente c where " +
         "lower(c.nome) like '%'||lower(:descricao)||'%'")
  List<Cliente> buscaCliente(@Param("descricao") String descricao);

  @Query("select coalesce(MAX(id), 0)+1 from Cliente")
  Integer sequencial();

  @Query("from Cliente c where c.id = :id")
  Cliente findOne(@Param("id") Integer id);

  @Query("from Cliente c where c.cpfcnpj = :cpfcnpj")
  Cliente findByCPFCNPJ(@Param("cpfcnpj") String cpfcnpj);
}
