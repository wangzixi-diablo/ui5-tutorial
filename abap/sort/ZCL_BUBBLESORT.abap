class ZCL_BUBBLESORT definition
  public
  final
  create public .

public section.

  class-methods SORT
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_TABLE) type ABADR_TAB_INT4 .
  class-methods SORT2
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_TABLE) type ABADR_TAB_INT4 .
protected section.
private section.
ENDCLASS.



CLASS ZCL_BUBBLESORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_BUBBLESORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort.

    rv_table = iv_table.
    DATA(lv_length) = lines( rv_table ).
    DATA(i) = 1.
    DATA: lv_left  TYPE int4,
          lv_right TYPE int4.

    DO lv_length - 1 TIMES.
      DATA(j) = lv_length - i.
      DATA(k) = 1.
      DO j TIMES.
        READ TABLE rv_table INTO lv_left INDEX k.
        READ TABLE rv_table INTO lv_right INDEX k + 1.
        IF lv_left > lv_right .
          MODIFY rv_table FROM lv_right INDEX k.
          MODIFY rv_table FROM lv_left INDEX k + 1 .
        ENDIF.
        k = k + 1.
      ENDDO.
      i = i + 1.
    ENDDO.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_BUBBLESORT=>SORT2
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort2.

    rv_table = iv_table.
    DATA(lv_length) = lines( rv_table ).
    DATA(lv_index) = 1.
    DATA lv_temp TYPE int4.
    DATA(lv_lines) = lines( rv_table ).

    DO lv_lines TIMES .
      WHILE lv_index < lv_length .
        IF rv_table[ lv_index ] > rv_table[  lv_index + 1 ].
          lv_temp = rv_table[ lv_index ] .
          rv_table[ lv_index ] = rv_table[  lv_index + 1 ] .
          rv_table[  lv_index + 1 ] = lv_temp .
        ENDIF.
        lv_index = lv_index + 1.
      ENDWHILE.
      lv_index = 1.
      lv_length = lv_length - 1.

    ENDDO.
  ENDMETHOD.
ENDCLASS.