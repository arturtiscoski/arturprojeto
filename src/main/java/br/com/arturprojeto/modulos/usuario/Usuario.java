package br.com.arturprojeto.modulos.usuario;

import javax.persistence.*;

@Entity
@Table(name = "USUARIOS")
public class Usuario {

    @Id
    @Column(name = "id")
    private Integer id;

}