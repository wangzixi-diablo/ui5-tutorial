class ZCL_HASHSORT definition
  public
  final
  create public .

public section.

  class-methods SORT
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_TABLE) type ABADR_TAB_INT4 .
protected section.
private section.

  class-methods GET_MAX
    importing
      !IT_TABLE type ABADR_TAB_INT4
    returning
      value(RV_MAX) type INT4 .
ENDCLASS.



CLASS ZCL_HASHSORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_HASHSORT=>GET_MAX
* +-------------------------------------------------------------------------------------------------+
* | [--->] IT_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_MAX                         TYPE        INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  method GET_MAX.
     rv_max = 0.
    LOOP AT it_table ASSIGNING FIELD-SYMBOL(<item>).
       IF <item> > rv_max.
          rv_max = <item>.
       ENDIF.
    ENDLOOP.

    rv_max = rv_max + 1.
  endmethod.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_HASHSORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  method SORT.
    DATA(lv_max) = GET_MAX( iv_table ).
    DATA: lt_bucket TYPE abadr_tab_int4.

    DO lv_max TIMES.
       APPEND 0 TO lt_bucket.
    ENDDO.

    LOOP AT iv_table ASSIGNING FIELD-SYMBOL(<item>).
       IF <item> = 0.
          APPEND <item> TO rv_table.
       ELSE.
          ASSIGN lt_bucket[ <item> ] TO FIELD-SYMBOL(<bucket>).
          ADD 1 TO <bucket>.
       ENDIF.
    ENDLOOP.

    DATA: lv_index TYPE int4 value 1,
          lv_bucket TYPE int4.

    WHILE lv_index < lv_max.
       lv_bucket = lt_bucket[ lv_index ].
       WHILE lv_bucket > 0.
          APPEND lv_index TO rv_table.
          lv_bucket = lv_bucket - 1.
       ENDWHILE.

       lv_index = lv_index + 1.
    ENDWHILE.
  endmethod.
ENDCLASS.