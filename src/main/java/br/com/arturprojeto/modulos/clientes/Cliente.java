package br.com.arturprojeto.modulos.clientes;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "clientes")
public class Cliente {

  public static class Lista {}
  public Cliente() {
  }

  @Id
  @JsonView(Lista.class)
  @Column(name = "id")
  private Integer id;

  @JsonView(Lista.class)
  @Column(name = "nome")
  private String nome;

  @JsonView(Lista.class)
  @Column(name = "cpfcnpj")
  private String cpfcnpj;

  @JsonView(Lista.class)
  @Column(name = "telefone")
  private String telefone;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getCpfcnpj() {
    return cpfcnpj;
  }

  public void setCpfcnpj(String cpfcnpj) {
    this.cpfcnpj = cpfcnpj;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }

  @Override
  public String toString() {
    return "Cliente{" +
            "id=" + id +
            ", nome=" + nome +
            ", cpfcnpj=" + cpfcnpj +
            ", telefone=" + telefone +
            '}';
  }
}