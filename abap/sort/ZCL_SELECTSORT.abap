class ZCL_SELECTSORT definition
  public
  final
  create public .

public section.

  class-methods SORT
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_RESULT) type ABADR_TAB_INT4 .
protected section.
private section.
ENDCLASS.



CLASS ZCL_SELECTSORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SELECTSORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_RESULT                      TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  method SORT.
    rv_result = iv_table.
    DATA(lv_len) = lines( rv_result ).
    DATA(i) = 1.
    WHILE i < lv_len.
       DATA(lv_min) = rv_result[ i ].
       DATA(j) = i + 1.
       WHILE j < lv_len + 1 .
         IF rv_result[ j ] < lv_min.
           DATA(lv_temp) = lv_min.
           lv_min = rv_result[ j ].
           rv_result[ j ] = lv_temp.
         ENDIF.
         j = j + 1.
       ENDWHILE.
       rv_result[ i ] = lv_min.
       i = i + 1.
    ENDWHILE.

  endmethod.
ENDCLASS.