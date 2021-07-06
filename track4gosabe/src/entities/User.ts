import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tbl_usuario_pkey", ["id"], { unique: true })
@Index("tbl_usuario_identification_card_user_key", ["identificationCard"], {
  unique: true,
})
@Entity("tbl_usuario", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_user" })
  id: number;

  @Column("character varying", { name: "name_user", length: 100 })
  name: string;

  @Column("character varying", {
    name: "identification_card_user",
    unique: true,
    length: 10,
  })
  identificationCard: string;

  @Column("character varying", { name: "phone_user", length: 10 })
  phone: string;

  @Column("character varying", { name: "email_user", length: 50 })
  email: string;
}